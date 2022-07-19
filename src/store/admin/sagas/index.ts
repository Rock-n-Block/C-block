import { fork } from 'redux-saga/effects';

import checkIsAdminSaga from './checkIsAdmin';
import setPaymentsReceiverSaga from './setPaymentsReceiver';
import setPriceSaga from './setPrice';
import getPaymentsReceiverSaga from './getPaymentsReceiver';
import getIsMainnetDisabledSaga from './getIsMainnetDisabled';
import setIsMainnetDisabledSaga from './setIsMainnetDisabled';
import getUsersSaga from './getUsers';
import sendEmailSaga from './sendEmail';
import setIsFrozenUserSaga from './setIsFrozenUser';
import getUserContractsSaga from './getUserContracts';

export default function* adminSaga() {
  yield fork(checkIsAdminSaga);
  yield fork(setPaymentsReceiverSaga);
  yield fork(setPriceSaga);
  yield fork(getPaymentsReceiverSaga);
  yield fork(getIsMainnetDisabledSaga);
  yield fork(setIsMainnetDisabledSaga);
  yield fork(getUsersSaga);
  yield fork(sendEmailSaga);
  yield fork(setIsFrozenUserSaga);
  yield fork(getUserContractsSaga);
}
