import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

import apiActions from 'store/ui/actions';
import { authApi } from 'store/api/apiRequestBuilder';
import { IResetPasswordReturnType } from 'store/api/auth.types';
import { resetPassword } from '../actions';
import actionTypes from '../actionTypes';

function* resetPasswordSaga({
  type,
  payload: {
    email,
  },
}: ReturnType<typeof resetPassword>) {
  try {
    yield put(apiActions.request(type));

    const {
      data: {
        detail,
      },
    }: AxiosResponse<IResetPasswordReturnType> = yield call(
      authApi.resetPassword,
      {
        email,
      },
    );
    toast.info(detail);

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.USER_AUTH_RESET_PASSWORD, resetPasswordSaga);
}
