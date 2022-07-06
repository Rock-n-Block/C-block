import { fork } from 'redux-saga/effects';

import getRatesSaga from './getRates';

export default function* getRates() {
  yield fork(getRatesSaga);
}
