import {
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  deleteTokenContractForm,
  deleteCrowdsaleContractForm,
  deleteLostKeyContractForm,
  deleteWillContractForm,
  deleteWeddingContractForm,
} from '../reducer';

export function* clearAllContractFormsSaga() {
  try {
    yield put(deleteTokenContractForm());
    yield put(deleteCrowdsaleContractForm());
    yield put(deleteLostKeyContractForm());
    yield put(deleteWillContractForm());
    yield put(deleteWeddingContractForm());
  } catch (err) {
    console.log(err);
  }
}

export default function* listener() {
  yield takeLatest('user/disconnectWalletState', clearAllContractFormsSaga);
}
