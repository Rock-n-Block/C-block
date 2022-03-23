import {
  select, put, call, takeLatest,
} from '@redux-saga/core/effects';

import userSelector from 'store/user/selectors';
import { Modals, UserState } from 'types';

import { setActiveModal } from 'store/modals/reducer';
import apiActions from 'store/ui/actions';
import { contractsHelper } from 'utils';
import { confirmActiveStatusModalConfirm } from '../actions';
import actionTypes from '../actionTypes';

function* confirmActiveStatusModalConfirmSaga(
  {
    type,
    payload: {
      provider,
      contractAddress,
    },
  }: ReturnType<typeof confirmActiveStatusModalConfirm>,
) {
  try {
    yield put(apiActions.request(type));
    yield put(setActiveModal({
      activeModal: Modals.SendTxPending,
      open: true,
    }));

    const { address: userWalletAddress }: UserState = yield select(
      userSelector.getUser,
    );
    const contract = contractsHelper.getLostKeyContract(provider, contractAddress);

    yield call(
      contract.methods.confirm().send,
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
  yield takeLatest(
    actionTypes.CONFIRM_ACTIVE_STATUS_MODAL_CONFIRM,
    confirmActiveStatusModalConfirmSaga,
  );
}
