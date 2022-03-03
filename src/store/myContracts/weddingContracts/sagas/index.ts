import { fork } from 'redux-saga/effects';

import initWithdrawalSaga from './initWithdrawal';
import approveWithdrawalSaga from './approveWithdrawal';
import rejectWithdrawalSaga from './rejectWithdrawal';

import initDivorceSaga from './initDivorce';
import approveDivorceSaga from './approveDivorce';
import rejectDivorceSaga from './rejectDivorce';

import getFundsAfterDivorceSaga from './getFundsAfterDivorce';

export default function* weddingContractsSaga() {
  yield fork(initWithdrawalSaga);
  yield fork(approveWithdrawalSaga);
  yield fork(rejectWithdrawalSaga);

  yield fork(initDivorceSaga);
  yield fork(approveDivorceSaga);
  yield fork(rejectDivorceSaga);

  yield fork(getFundsAfterDivorceSaga);
}
