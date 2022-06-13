import { fork } from 'redux-saga/effects';

import checkIsAdminSaga from './checkIsAdmin';

export default function* authSaga() {
  yield fork(checkIsAdminSaga);
}
