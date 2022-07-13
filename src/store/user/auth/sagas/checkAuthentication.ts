import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import apiActions from 'store/ui/actions';
import userSelector from 'store/user/selectors';
import { checkAuthentication, logout } from '../actions';
import actionTypes from '../actionTypes';
import { getUserDataSaga } from './getUserData';

function* checkAuthenticationSaga({
  type,
}: ReturnType<typeof checkAuthentication>) {
  try {
    yield put(apiActions.request(type));

    yield call(
      getUserDataSaga,
      {
        type: '',
        payload: {
          showErrorNotification: false,
        },
      },
    );

    const isAuthenticated: string = yield select(
      userSelector.selectIsAuthenticated,
    );

    if (!isAuthenticated) {
      yield put(logout());
    }

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err, err?.response);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.USER_AUTH_CHECK_AUTHENTICATION, checkAuthenticationSaga);
}
