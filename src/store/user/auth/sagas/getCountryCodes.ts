import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import apiActions from 'store/ui/actions';
import { authApi } from 'store/api/apiRequestBuilder';
import { setUser } from 'store/user/reducer';
import { AxiosResponse } from 'axios';
import { TGetCountryCodesReturnType } from 'store/api/auth.types';
import { getCountryCodes } from '../actions';
import actionTypes from '../actionTypes';

export function* getCountryCodesSaga({
  type,
}: ReturnType<typeof getCountryCodes>) {
  try {
    yield put(apiActions.request(type));

    const {
      data: countryCodes,
    }: AxiosResponse<TGetCountryCodesReturnType> = yield call(
      authApi.getCountryCodes,
    );

    yield put(setUser({
      countryCodes: countryCodes.map(({ country_code: countryCode, country_name: countryName, phone_code: phoneCode }) => ({
        countryCode,
        countryName,
        phoneCode,
      })),
    }));
    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err, err.response);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(
    actionTypes.USER_GET_COUNTRY_CODES,
    getCountryCodesSaga,
  );
}
