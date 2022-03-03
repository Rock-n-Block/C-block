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
import { getFundsAfterDivorce } from '../actions';

function* getFundsAfterDivorceSaga({
  type,
  payload: { provider, contractAddress, tokensAddresses },
}: ReturnType<typeof getFundsAfterDivorce>) {
  try {
    yield put(apiActions.request(type));

    const { address: userWalletAddress }: UserState = yield select(userSelector.getUser);
    const contract = new provider.eth.Contract(weddingAbi, contractAddress);
    const addresses = tokensAddresses.map(({ address }) => address);
    yield call(
      contract.methods.getFundsAfterDivorce(addresses).send,
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
  yield takeLatest(actionTypes.GET_FUNDS_AFTER_DIVORCE, getFundsAfterDivorceSaga);
}
