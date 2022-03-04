import {
  select,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import apiActions from 'store/ui/actions';
import { enableWeddingSuccessfulWithdrawal } from 'store/myContracts/reducer';
import {
  UserState,
} from 'types';
import userSelector from 'store/user/selectors';
import { weddingAbi } from 'config/abi';
import actionTypes from '../actionTypes';
import { approveWithdrawal } from '../actions';

function* approveWithdrawalSaga({
  type,
  payload: { provider, contractAddress },
}: ReturnType<typeof approveWithdrawal>) {
  try {
    yield put(apiActions.request(type));

    const { address: userWalletAddress }: UserState = yield select(userSelector.getUser);
    const contract = new provider.eth.Contract(weddingAbi, contractAddress);
    yield call(
      contract.methods.executeWithdrawalProposal().send,
      {
        from: userWalletAddress,
      },
    );

    yield put(enableWeddingSuccessfulWithdrawal({
      contractAddress,
    }));
    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.APPROVE_WITHDRAWAL, approveWithdrawalSaga);
}
