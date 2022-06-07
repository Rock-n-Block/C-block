import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import apiActions from 'store/ui/actions';
import { authApi } from 'store/api/apiRequestBuilder';
import { setUser } from 'store/user/reducer';
import { AxiosResponse } from 'axios';
import { logout } from '../actions';
import actionTypes from '../actionTypes';

function* getFirstRegistrationAccountDataSaga({
  type,
}: ReturnType<typeof logout>) {
  try {
    yield put(apiActions.request(type));

    const response: AxiosResponse<{ email: string; owner_address: string; }> = yield call(
      authApi.getFirstRegistrationAccountData,
    );

    yield put(setUser({
      initEmail: response.data.email,
      initUserAddress: response.data.owner_address,
    }));
    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(
    actionTypes.USER_AUTH_GET_FIRST_REGISTRATION_ACCOUNT_DATA,
    getFirstRegistrationAccountDataSaga,
  );
}
