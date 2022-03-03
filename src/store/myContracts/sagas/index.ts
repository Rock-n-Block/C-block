import { fork } from 'redux-saga/effects';

import getMyContractsSaga from './getMyContracts';
import weddingContractsSaga from '../weddingContracts/sagas';

export default function* myContractsSaga() {
  yield fork(getMyContractsSaga);

  yield fork(weddingContractsSaga);
}
