import { fork } from 'redux-saga/effects';

import approveSaga from './approveSaga';
import getContractCreationPriceSaga from './getContractCreationPriceSaga';
import createTokenContract from './createTokenContract';
import createLostKeyContract from './createLostKeyContract';
import createWillContract from './createWillContract';
import createCrowdsaleContract from './createCrowdsaleContract';

export default function* createContractsSaga() {
  yield fork(approveSaga);
  yield fork(getContractCreationPriceSaga);

  yield fork(createTokenContract);
  yield fork(createLostKeyContract);
  yield fork(createWillContract);
  yield fork(createCrowdsaleContract);
}
