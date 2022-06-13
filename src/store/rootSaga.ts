import { fork } from 'redux-saga/effects';

import createContractsSaga from 'store/contractForms/sagas';
import myContractsSaga from 'store/myContracts/sagas';
import earnSaga from 'store/earn/sagas';
import userSaga from 'store/user/sagas';
import adminSaga from 'store/admin/sagas';

export default function* rootSaga() {
  yield fork(createContractsSaga);

  yield fork(myContractsSaga);
  yield fork(earnSaga);
  yield fork(userSaga);
  yield fork(adminSaga);
}
