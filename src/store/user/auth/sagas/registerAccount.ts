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
import { IGetMetamaskMessageReturnType } from 'store/api/auth.types';
import { UserState } from 'types';
import userSelector from 'store/user/selectors';
import { registerAccount } from '../actions';
import actionTypes from '../actionTypes';

function* registerAccountSaga({
  type,
  payload: {
    provider,
    email,
    password1,
    password2,
  },
}: ReturnType<typeof registerAccount>) {
  try {
    yield put(apiActions.request(type));

    const { data: metamaskMessage }: AxiosResponse<IGetMetamaskMessageReturnType> = yield call(
      authApi.getMetamaskMessage,
    );

    const { address: userWalletAddress }: UserState = yield select(
      userSelector.getUser,
    );
    const signature = yield provider.eth.personal.sign(metamaskMessage, userWalletAddress, '');

    const registerResponse: AxiosResponse = yield call(
      authApi.registerAccount,
      {
        email,
        password1,
        password2,
        owner_address: userWalletAddress,
        message: metamaskMessage,
        signature,
      },
    );
    if (registerResponse.status < 200 || registerResponse.status >= 300) {
      throw new Error('Backend thrown response with status code not equal to 2xx');
    }
    setNotification({
      type: 'success',
      message: registerResponse.data.detail,
    });

    yield put(apiActions.success(type));
  } catch (err) {
    const axiosRequestError = Object.values(err?.response?.data).join('; ');
    console.log(err, err?.response, axiosRequestError);
    setNotification({
      type: 'error',
      message: `Error occurred while register new account: ${axiosRequestError}`,
    });
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.USER_AUTH_REGISTER_ACCOUNT, registerAccountSaga);
}
