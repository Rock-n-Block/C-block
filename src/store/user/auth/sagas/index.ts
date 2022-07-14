import { fork } from 'redux-saga/effects';

import resetPasswordSaga from './resetPassword';
import confirmResetPasswordSaga from './confirmResetPassword';
import changePasswordSaga from './changePassword';
import registerAccountSaga from './registerAccount';
import logoutSaga from './logout';
import loginSaga from './login';
import getUserDataSaga from './getUserData';
import checkAuthenticationSaga from './checkAuthentication';
import updateProfileSaga from './updateProfile';
import getCountryCodesSaga from './getCountryCodes';

export default function* authSaga() {
  yield fork(resetPasswordSaga);
  yield fork(confirmResetPasswordSaga);
  yield fork(changePasswordSaga);
  yield fork(registerAccountSaga);
  yield fork(loginSaga);
  yield fork(logoutSaga);
  yield fork(getUserDataSaga);
  yield fork(checkAuthenticationSaga);
  yield fork(updateProfileSaga);
  yield fork(getCountryCodesSaga);
}
