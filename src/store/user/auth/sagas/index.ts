import { fork } from 'redux-saga/effects';

import resetPasswordSaga from './resetPassword';
import confirmResetPasswordSaga from './confirmResetPassword';
import registerAccountSaga from './registerAccount';
import logoutSaga from './logout';
import loginSaga from './login';
import getRegistrationAccountDataSaga from './getRegistrationAccountData';
import checkAuthenticationSaga from './checkAuthentication';

export default function* authSaga() {
  yield fork(resetPasswordSaga);
  yield fork(confirmResetPasswordSaga);
  yield fork(registerAccountSaga);
  yield fork(loginSaga);
  yield fork(logoutSaga);
  yield fork(getRegistrationAccountDataSaga);
  yield fork(checkAuthenticationSaga);
}
