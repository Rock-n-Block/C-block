import { fork } from 'redux-saga/effects';

import getFinishedContractsSaga from './getFinishedContracts';

export default function* finishedContracts() {
  yield fork(getFinishedContractsSaga);
}
