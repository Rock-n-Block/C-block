import { fork } from 'redux-saga/effects';

import approveSaga from './approveSaga';
import getContractCreationPriceSaga from './getContractCreationPriceSaga';
import createTokenContract from './createTokenContract';
import createLostKeyContract from './createLostKeyContract';
import createWillContract from './createWillContract';
import createCrowdsaleContract from './createCrowdsaleContract';
import createWeddingContract from './createWeddingContract';
import getErc20Symbol from './erc20/getSymbol';
import getCrowdsaleContractAdditionalData from './getCrowdsaleContractAdditionalData';

export default function* createContractsSaga() {
  yield fork(getErc20Symbol);
  yield fork(approveSaga);
  yield fork(getContractCreationPriceSaga);

  yield fork(createTokenContract);
  yield fork(createLostKeyContract);
  yield fork(createWillContract);
  yield fork(createCrowdsaleContract);
  yield fork(createWeddingContract);

  yield fork(getCrowdsaleContractAdditionalData);
}
