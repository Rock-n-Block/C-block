import { fork } from 'redux-saga/effects';

import confirmSaga from './confirm';

export default function* confirmActiveStatusModal() {
  yield fork(confirmSaga);
}
