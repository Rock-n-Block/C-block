import { fork } from 'redux-saga/effects';

import getMyContractsSaga from './getMyContracts';
import weddingContractsSaga from '../weddingContracts/sagas';
import setUpModalSaga from '../setUpModal/sagas';

export default function* myContractsSaga() {
  yield fork(getMyContractsSaga);

  yield fork(weddingContractsSaga);
  yield fork(setUpModalSaga);
}
