import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import apiActions from 'store/ui/actions';
import { authApi } from 'store/api/apiRequestBuilder';
import { setUser } from 'store/user/reducer';
import { AxiosResponse } from 'axios';
import { setNotification } from 'utils';
import { logout } from '../actions';
import actionTypes from '../actionTypes';

export function* getRegistrationAccountDataSaga({
  type,
  payload: {
    showErrorNotification,
  },
}: ReturnType<typeof logout>) {
  try {
    yield put(apiActions.request(type));

    const response: AxiosResponse<{ email: string; owner_address: string; }> = yield call(
      authApi.getRegistrationAccountData,
    );

    yield put(setUser({
      registrationEmail: response.data.email,
      registrationWalletAddress: response.data.owner_address,
    }));
    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err, err.response);
    const axiosRequestError = Object.values(err?.response?.data).join('; ');
    if (showErrorNotification) {
      setNotification({
        type: 'error',
        message: `Couldn't get user's registration email and wallet address. ${axiosRequestError}`,
      });
    }
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(
    actionTypes.USER_AUTH_GET_REGISTRATION_ACCOUNT_DATA,
    getRegistrationAccountDataSaga,
  );
}
