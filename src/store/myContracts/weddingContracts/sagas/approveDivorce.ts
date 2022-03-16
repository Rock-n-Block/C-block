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
import { enableWeddingSuccessfulDivorce } from 'store/myContracts/reducer';
import { contractsHelper } from 'utils';
import actionTypes from '../actionTypes';
import { approveDivorce } from '../actions';

function* approveDivorceSaga({
  type,
  payload: { provider, contractAddress },
}: ReturnType<typeof approveDivorce>) {
  try {
    yield put(apiActions.request(type));

    const { address: userWalletAddress }: UserState = yield select(userSelector.getUser);
    const contract = contractsHelper.getWeddingContract(provider, contractAddress);
    yield call(
      contract.methods.agreeWithDivorce().send,
      {
        from: userWalletAddress,
      },
    );

    yield put(enableWeddingSuccessfulDivorce({
      contractAddress,
    }));
    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.APPROVE_DIVORCE, approveDivorceSaga);
}
