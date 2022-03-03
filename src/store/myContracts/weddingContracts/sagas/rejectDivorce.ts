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
import { weddingAbi } from 'config/abi';
import actionTypes from '../actionTypes';
import { rejectDivorce } from '../actions';

function* rejectDivorceSaga({
  type,
  payload: { provider, contractAddress },
}: ReturnType<typeof rejectDivorce>) {
  try {
    yield put(apiActions.request(type));

    const { address: userWalletAddress }: UserState = yield select(userSelector.getUser);
    const contract = new provider.eth.Contract(weddingAbi, contractAddress);
    yield call(
      contract.methods.disputeDivorce().send,
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
  yield takeLatest(actionTypes.REJECT_DIVORCE, rejectDivorceSaga);
}
