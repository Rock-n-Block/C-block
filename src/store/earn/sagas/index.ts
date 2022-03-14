import { fork } from 'redux-saga/effects';

import getFinishedContractsSaga from './getFinishedContracts';
import transferRewardSaga from './transferReward';

export default function* finishedContracts() {
  yield fork(getFinishedContractsSaga);
  yield fork(transferRewardSaga);
}
