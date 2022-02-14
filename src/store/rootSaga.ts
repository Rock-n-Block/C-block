import { fork } from 'redux-saga/effects';
import createContractsSaga from 'store/contractForms/sagas';

export default function* rootSaga() {
  yield fork(createContractsSaga);
}
