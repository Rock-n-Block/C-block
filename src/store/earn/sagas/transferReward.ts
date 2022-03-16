import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';

import userSelector from 'store/user/selectors';
import apiActions from 'store/ui/actions';
import { setActiveModal } from 'store/modals/reducer';

import { Modals } from 'types';
import { contractsHelper } from 'utils';
import actionTypes from '../actionTypes';
import { transferReward } from '../actions';
import { removeFinishedContract } from '../reducer';

function* transferRewardSaga({
  type,
  payload: { provider, contractAddress },
}: ReturnType<typeof transferReward>) {
  try {
    yield put(apiActions.request(type));
    yield put(setActiveModal({
      activeModal: Modals.SendTxPending,
      open: true,
    }));

    const { address: userWalletAddress } = yield select(userSelector.getUser);
    const contract = contractsHelper.getLostKeyContract(provider, contractAddress);

    yield call(
      contract.methods.distribute().send,
      {
        from: userWalletAddress,
      },
    );

    yield put(removeFinishedContract({ contractAddress }));
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
  yield takeLatest(actionTypes.TRANSFER_REWARD, transferRewardSaga);
}
