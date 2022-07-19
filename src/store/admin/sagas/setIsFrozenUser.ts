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
import { updateUser } from '../reducer';

function* setIsFrozenUserSaga({
  type,
  payload: {
    userId,
    isFrozen,
  },
}: ReturnType<typeof adminActions.setIsFrozenUser>) {
  try {
    yield put(apiActions.request(type));

    yield call(
      roleSystemApi.setIsFrozenUser,
      {
        id: userId,
        freezed: isFrozen,
      },
    );
    yield put(
      updateUser({
        userId,
        user: {
          isFrozen,
        },
      }),
    );
    setNotification({
      type: 'success',
      message: 'User account has been successfully frozen',
    });

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err, err?.response);
    setNotification({
      type: 'error',
      message: 'Error occurred while freezing this account',
    });
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.ADMIN_SET_IS_FROZEN_USER, setIsFrozenUserSaga);
}
