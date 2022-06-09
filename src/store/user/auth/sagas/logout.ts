import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import apiActions from 'store/ui/actions';
import { authApi } from 'store/api/apiRequestBuilder';
import { setUser } from 'store/user/reducer';
import { logout } from '../actions';
import actionTypes from '../actionTypes';

function* logoutSaga({
  type,
}: ReturnType<typeof logout>) {
  try {
    yield put(apiActions.request(type));

    yield call(
      authApi.logout,
    );

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err, err.response);
    yield put(apiActions.error(type, err));
  } finally {
    yield put(
      setUser({
        email: '',
        registrationEmail: '',
        registrationWalletAddress: '',
      }),
    );
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.USER_AUTH_LOGOUT, logoutSaga);
}
