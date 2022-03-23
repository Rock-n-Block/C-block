import {
  select,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import apiActions from 'store/ui/actions';
import {
  Modals,
  UserState,
} from 'types';
import userSelector from 'store/user/selectors';
import { contractsHelper, getTokenAmount, setNotification } from 'utils';
import { checkIfTokenAddress } from 'store/erc20/sagas';
import { setActiveModal } from 'store/modals/reducer';
import actionTypes from '../actionTypes';
import { initWithdrawal } from '../actions';

function* initWithdrawalSaga({
  type,
  payload: {
    provider, contractAddress, tokenAddress, addressToSend, amount,
  },
}: ReturnType<typeof initWithdrawal>) {
  try {
    const isTokenAddress: boolean = yield call(checkIfTokenAddress, provider, tokenAddress);
    if (!isTokenAddress) {
      setNotification({
        type: 'warning',
        message: 'Provided token address is invalid',
      });
      return;
    }
  } catch (err) {
    console.log(err);
    return;
  }

  try {
    yield put(apiActions.request(type));
    yield put(setActiveModal({
      activeModal: Modals.SendTxPending,
      open: true,
    }));

    const { address: userWalletAddress }: UserState = yield select(userSelector.getUser);

    const contract = contractsHelper.getWeddingContract(provider, contractAddress);
    const tokenContract = contractsHelper.getBep20Contract(provider, tokenAddress);
    const decimals: string = yield call(
      tokenContract.methods.decimals().call,
    );

    const serializedAmount = getTokenAmount(
      amount,
      +decimals,
      false,
    );

    yield call(
      contract.methods.proposeWithdrawal(tokenAddress, addressToSend, serializedAmount).send,
      {
        from: userWalletAddress,
      },
    );

    yield put(setActiveModal({
      activeModal: Modals.SendTxSuccess,
      open: true,
    }));
    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(setActiveModal({
      activeModal: Modals.SendTxRejected,
      open: true,
    }));
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.INIT_WITHDRAWAL, initWithdrawalSaga);
}
