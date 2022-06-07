import { fork } from 'redux-saga/effects';

import resetPasswordSaga from './resetPassword';
import confirmResetPasswordSaga from './confirmResetPassword';

export default function* authSaga() {
  yield fork(resetPasswordSaga);
  yield fork(confirmResetPasswordSaga);
}
