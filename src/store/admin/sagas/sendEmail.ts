import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { roleSystemApi } from 'store/api/apiRequestBuilder';

import apiActions from 'store/ui/actions';
import { setNotification } from 'utils';
import adminActions from '../actions';
import actionTypes from '../actionTypes';

function* sendEmailSaga({
  type,
  payload: {
    userId,
    message,
  },
}: ReturnType<typeof adminActions.sendEmail>) {
  try {
    yield put(apiActions.request(type));

    yield call(
      roleSystemApi.sendEmail,
      {
        id: userId,
        message,
      },
    );
    setNotification({
      type: 'success',
      message: 'Email has been successfully sent',
    });

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err, err?.response);
    setNotification({
      type: 'error',
      message: 'Error occurred while sending this email',
    });
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.ADMIN_SEND_EMAIL, sendEmailSaga);
}
