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
import { getMyContracts } from 'store/myContracts/actions';
import { contractsHelper } from 'utils';
import actionTypes from '../actionTypes';
import { rejectWithdrawal } from '../actions';

function* rejectWithdrawalSaga({
  type,
  payload: { provider, contractAddress },
}: ReturnType<typeof rejectWithdrawal>) {
  try {
    yield put(apiActions.request(type));

    const { address: userWalletAddress }: UserState = yield select(userSelector.getUser);
    const contract = contractsHelper.getWeddingContract(provider, contractAddress);
    yield call(
      contract.methods.rejectWithdrawalProposal().send,
      {
        from: userWalletAddress,
      },
    );

    yield put(apiActions.success(type));
    yield put(getMyContracts({
      provider,
    }));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.REJECT_WITHDRAWAL, rejectWithdrawalSaga);
}
