/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/ui/actions';
import userSelector from 'store/user/selectors';
import { bep20Abi } from 'config/abi';
import actionTypes from '../actionTypes';
import { approve } from '../actions';

export function* approveSaga({
  type,
  payload: {
    provider,
    spender,
    tokenAddress,
    amount,
  },
}: ReturnType<typeof approve>) {
  try {
    yield put(apiActions.request(type));
    const { address: myAddress } = yield select(userSelector.getUser);

    const tokenContract = new provider.eth.Contract(bep20Abi, tokenAddress);
    yield call(tokenContract.methods.approve(spender, amount.toString()).send, {
      from: myAddress,
    });

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
    throw err;
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.APPROVE, approveSaga);
}
