import { fork } from 'redux-saga/effects';

import checkIsAdminSaga from './checkIsAdmin';
import setPaymentsReceiverSaga from './setPaymentsReceiver';

export default function* adminSaga() {
  yield fork(checkIsAdminSaga);
  yield fork(setPaymentsReceiverSaga);
}
