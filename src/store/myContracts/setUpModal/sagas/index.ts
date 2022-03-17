import { fork } from 'redux-saga/effects';

import updateAllowanceSaga from './updateAllowance';
import setUpModalApproveSaga from './approve';
import getSetUpModalTokenAddresses from './getSetUpModalTokenAddresses';

export default function* setUpModal() {
  yield fork(updateAllowanceSaga);
  yield fork(setUpModalApproveSaga);
  yield fork(getSetUpModalTokenAddresses);
}
