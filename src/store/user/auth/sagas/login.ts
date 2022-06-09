import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import apiActions from 'store/ui/actions';
import { authApi } from 'store/api/apiRequestBuilder';
import { setNotification } from 'utils';
import userSelector from 'store/user/selectors';
import { setUser } from 'store/user/reducer';
import { login } from '../actions';
import actionTypes from '../actionTypes';
import { getRegistrationAccountDataSaga } from './getRegistrationAccountData';

function* loginSaga({
  type,
  payload: {
    email,
    password,
  },
}: ReturnType<typeof login>) {
  try {
    yield put(apiActions.request(type));

    yield call(
      authApi.login,
      {
        email,
        password,
      },
    );

    yield put(setUser({
      email,
    }));

    yield call(
      getRegistrationAccountDataSaga,
      {
        type: '',
        payload: {
          showErrorNotification: true,
        },
      },
    );

    const isAuthenticated: string = yield select(userSelector.selectIsAuthenticated);

    if (isAuthenticated) {
      setNotification({
        type: 'success',
        message: 'Authentication succeeded',
      });
    } else {
      setNotification({
        type: 'error',
        message: 'Couldn\'t log in. Check if you\'re using the same wallet address that was specified on sign up',
      });
      throw new Error('Login: /accounts/user/');
    }

    yield put(apiActions.success(type));
  } catch (err) {
    const axiosRequestError = err.response ? Object.values(err?.response?.data).join('; ') : '';
    console.log(err, err?.response, axiosRequestError);
    if (axiosRequestError) {
      setNotification({
        type: 'error',
        message: `Error occurred while logging in: ${axiosRequestError}`,
      });
    }
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.USER_AUTH_LOGIN, loginSaga);
}
