import {
  select,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import apiActions from 'store/ui/actions';
import { enableWeddingSuccessfulWithdrawal } from 'store/myContracts/reducer';
import {
  Modals,
  UserState,
} from 'types';
import userSelector from 'store/user/selectors';
import { contractsHelper } from 'utils';
import { setActiveModal } from 'store/modals/reducer';
import actionTypes from '../actionTypes';
import { approveWithdrawal } from '../actions';

function* approveWithdrawalSaga({
  type,
  payload: { provider, contractAddress },
}: ReturnType<typeof approveWithdrawal>) {
  try {
    yield put(apiActions.request(type));
    yield put(setActiveModal({
      activeModal: Modals.SendTxPending,
      open: true,
    }));

    const { address: userWalletAddress }: UserState = yield select(userSelector.getUser);
    const contract = contractsHelper.getWeddingContract(provider, contractAddress);
    yield call(
      contract.methods.executeWithdrawalProposal().send,
      {
        from: userWalletAddress,
      },
    );

    yield put(enableWeddingSuccessfulWithdrawal({
      contractAddress,
    }));
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
  yield takeLatest(actionTypes.APPROVE_WITHDRAWAL, approveWithdrawalSaga);
}
