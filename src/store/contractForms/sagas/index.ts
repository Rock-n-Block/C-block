import { fork } from 'redux-saga/effects';

import createTokenContract from './createTokenContract';
import approveSaga from './approveSaga';
import createLostKeyContract from './createLostKeyContract';
import createWillContract from './createWillContract';

export default function* createContractsSaga() {
  yield fork(createTokenContract);
  yield fork(approveSaga);
  yield fork(createLostKeyContract);
  yield fork(createWillContract);
}
