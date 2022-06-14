import { fork } from 'redux-saga/effects';

import checkIsAdminSaga from './checkIsAdmin';
import setPaymentsReceiverSaga from './setPaymentsReceiver';
import setPriceSaga from './setPrice';
import getPaymentsReceiverSaga from './getPaymentsReceiver';

export default function* adminSaga() {
  yield fork(checkIsAdminSaga);
  yield fork(setPaymentsReceiverSaga);
  yield fork(setPriceSaga);
  yield fork(getPaymentsReceiverSaga);
}
