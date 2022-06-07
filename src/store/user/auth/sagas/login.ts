import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import apiActions from 'store/ui/actions';
import { authApi } from 'store/api/apiRequestBuilder';
import { setNotification } from 'utils';
import { UserState } from 'types';
import userSelector from 'store/user/selectors';
import { setUser } from 'store/user/reducer';
import { login, logout } from '../actions';
import actionTypes from '../actionTypes';
import { getFirstRegistrationAccountDataSaga } from './getFirstRegistrationAccountData';

function* loginSaga({
  type,
  payload: {
    email,
    password,
  },
}: ReturnType<typeof login>) {
  try {
    yield put(apiActions.request(type));

    const loginResponse: AxiosResponse = yield call(
      authApi.login,
      {
        email,
        password,
      },
    );

    if (loginResponse.status < 200 || loginResponse.status >= 300) {
      throw new Error('Backend thrown response with status code not equal to 2xx');
    }

    yield put(
      setUser({
        authorizationToken: loginResponse.data?.key,
      }),
    );

    yield call(
      getFirstRegistrationAccountDataSaga,
      {
        type: '',
        payload: undefined,
      },
    );

    const { address: userWalletAddress, initEmail, initUserAddress }: UserState = yield select(
      userSelector.getUser,
    );

    if (email.toLowerCase() === initEmail.toLowerCase() &&
      (userWalletAddress.toLowerCase() !== initUserAddress.toLowerCase())
    ) {
      setNotification({
        type: 'error',
        message: 'Connected wallet address is different to the one chosen on sign up',
      });
      yield put(
        logout(),
      );
      throw new Error('First registration account wallet address must stay the same');
    }

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    setNotification({
      type: 'error',
      message: 'Error occurred while logging in',
    });
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.USER_AUTH_LOGIN, loginSaga);
}
