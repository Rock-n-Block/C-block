import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import apiActions from 'store/ui/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import {
  TGetRatesReturnType,
} from 'store/api/apiRequestBuilder.types';
import actionTypes from '../actionTypes';
import { getRates } from '../actions';
import { setRates } from '../reducer';

function* getRatesSaga({
  type,
}: ReturnType<typeof getRates>) {
  try {
    yield put(apiActions.request(type));

    const {
      data: [{
        rate: celoAsUsd,
      }],
      // TODO: add support for cUsd/Usd pair??
    }: AxiosResponse<TGetRatesReturnType> = yield call(baseApi.getRates);

    yield put(setRates({
      celo: celoAsUsd,
    }));
    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_RATES, getRatesSaga);
}
