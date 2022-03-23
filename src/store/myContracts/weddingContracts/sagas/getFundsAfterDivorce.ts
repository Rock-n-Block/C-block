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
import { contractsHelper } from 'utils';
import { setActiveModal } from 'store/modals/reducer';
import actionTypes from '../actionTypes';
import { getFundsAfterDivorce } from '../actions';

function* getFundsAfterDivorceSaga({
  type,
  payload: { provider, contractAddress, tokensAddresses },
}: ReturnType<typeof getFundsAfterDivorce>) {
  try {
    yield put(apiActions.request(type));
    yield put(setActiveModal({
      activeModal: Modals.SendTxPending,
      open: true,
    }));

    const { address: userWalletAddress }: UserState = yield select(userSelector.getUser);
    const contract = contractsHelper.getWeddingContract(provider, contractAddress);
    const addresses = tokensAddresses.map(({ address }) => address);
    yield call(
      contract.methods.getFundsAfterDivorce(addresses).send,
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
  yield takeLatest(actionTypes.GET_FUNDS_AFTER_DIVORCE, getFundsAfterDivorceSaga);
}
