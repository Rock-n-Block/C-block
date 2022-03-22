import {
  call, put, takeLatest,
} from '@redux-saga/core/effects';

import apiActions from 'store/ui/actions';
import { contractsHelper } from 'utils';
import { getErc20Symbol } from '../actions';
import actionTypes from '../actionTypes';

export function* getSymbolSaga({
  type,
  payload: {
    provider,
    tokenAddress,
  },
}: ReturnType<typeof getErc20Symbol>) {
  try {
    yield put(apiActions.request(type));

    const contract = contractsHelper.getBep20Contract(
      provider,
      tokenAddress,
    );

    const symbol: string = yield call(contract.methods.symbol().call);

    yield put(apiActions.success(type));
    return symbol;
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
    return null;
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_ERC20_SYMBOL, getSymbolSaga);
}
