import { fork } from 'redux-saga/effects';

import resetPasswordSaga from './resetPassword';

export default function* authSaga() {
  yield fork(resetPasswordSaga);
}
