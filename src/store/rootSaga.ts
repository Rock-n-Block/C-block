import { fork } from 'redux-saga/effects';
import createContractsSaga from 'store/contractForms/sagas';
import myContractsSaga from 'store/myContracts/sagas';
import earnSaga from 'store/earn/sagas';

export default function* rootSaga() {
  yield fork(createContractsSaga);

  yield fork(myContractsSaga);
  yield fork(earnSaga);
}
