import { fork } from 'redux-saga/effects';

import updateAllowanceSaga from './updateAllowance';
import setUpModalApproveSaga from './approve';
import getSetUpModalTokenAddresses from './getSetUpModalTokenAddresses';
import setUpModalAddTokens from './addTokens';

export default function* setUpModal() {
  yield fork(updateAllowanceSaga);
  yield fork(setUpModalApproveSaga);
  yield fork(getSetUpModalTokenAddresses);
  yield fork(setUpModalAddTokens);
}
