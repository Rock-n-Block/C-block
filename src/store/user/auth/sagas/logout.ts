import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import apiActions from 'store/ui/actions';
import { authApi } from 'store/api/apiRequestBuilder';
import { setNotification } from 'utils';
import { setUser } from 'store/user/reducer';
import { logout } from '../actions';
import actionTypes from '../actionTypes';

function* logoutSaga({
  type,
}: ReturnType<typeof logout>) {
  try {
    yield put(apiActions.request(type));

    const {
      data: {
        detail,
      },
    } = yield call(
      authApi.logout,
    );

    setNotification({
      type: 'success',
      message: detail,
    });

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err, err.response);
    yield put(apiActions.error(type, err));
  } finally {
    yield put(
      setUser({
        authorizationToken: '',
      }),
    );
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.USER_AUTH_LOGOUT, logoutSaga);
}
