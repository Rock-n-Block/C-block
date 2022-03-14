import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';

import userSelector from 'store/user/selectors';
import apiActions from 'store/ui/actions';
import { lostKeyAbi } from 'config/abi';
import actionTypes from '../actionTypes';
import { transferReward } from '../actions';
import { removeFinishedContract } from '../reducer';

function* transferRewardSaga({
  type,
  payload: { provider, contractAddress },
}: ReturnType<typeof transferReward>) {
  try {
    yield put(apiActions.request(type));

    const { address: userWalletAddress } = yield select(userSelector.getUser);
    const contract = new provider.eth.Contract(lostKeyAbi, contractAddress);

    yield call(
      contract.methods.distribute().send,
      {
        from: userWalletAddress,
      },
    );

    yield put(removeFinishedContract({ contractAddress }));
    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.TRANSFER_REWARD, transferRewardSaga);
}
