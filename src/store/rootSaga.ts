import { fork } from 'redux-saga/effects';
import createContractsSaga from 'store/contractForms/sagas';
import myContractsSaga from 'store/myContracts/sagas';

export default function* rootSaga() {
  yield fork(createContractsSaga);

  yield fork(myContractsSaga);
}
