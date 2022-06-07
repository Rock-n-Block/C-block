import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import apiActions from 'store/ui/actions';
import { authApi } from 'store/api/apiRequestBuilder';
import { setNotification } from 'utils';
import { confirmResetPassword } from '../actions';
import actionTypes from '../actionTypes';

function* confirmResetPasswordSaga({
  type,
  payload: {
    password,
    uid,
    token,
  },
}: ReturnType<typeof confirmResetPassword>) {
  try {
    yield put(apiActions.request(type));

    const response: AxiosResponse = yield call(
      authApi.confirmResetPassword,
      {
        new_password1: password,
        new_password2: password,
        uid,
        token,
      },
    );
    if (response.status < 200 || response.status >= 300) {
      throw new Error('Backend thrown response with status code not equal to 2xx');
    }

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    setNotification({
      type: 'error',
      message: 'Error occurred while resetting password. Check if link that sent to email is valid',
    });
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.USER_AUTH_CONFIRM_RESET_PASSWORD, confirmResetPasswordSaga);
}
