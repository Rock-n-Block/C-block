import { fork } from 'redux-saga/effects';

import createTokenContract from './createTokenContract';
import approveSaga from './approveSaga';

export default function* createContractsSaga() {
  yield fork(createTokenContract);
  yield fork(approveSaga);
}
