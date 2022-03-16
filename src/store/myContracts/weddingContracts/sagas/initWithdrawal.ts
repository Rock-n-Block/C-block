import {
  select,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import apiActions from 'store/ui/actions';
import {
  UserState,
} from 'types';
import userSelector from 'store/user/selectors';
import { contractsHelper, getTokenAmount } from 'utils';
import actionTypes from '../actionTypes';
import { initWithdrawal } from '../actions';

function* initWithdrawalSaga({
  type,
  payload: {
    provider, contractAddress, tokenAddress, addressToSend, amount,
  },
}: ReturnType<typeof initWithdrawal>) {
  try {
    yield put(apiActions.request(type));

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

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.INIT_WITHDRAWAL, initWithdrawalSaga);
}
