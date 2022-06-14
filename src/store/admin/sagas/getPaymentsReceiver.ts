import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import apiActions from 'store/ui/actions';
import userSelector from 'store/user/selectors';
import { ContractsNames, UserState } from 'types';
import { contractsHelper } from 'utils';
import { getPaymentsReceiver } from '../actions';
import actionTypes from '../actionTypes';
import { setPaymentsReceiverAddress } from '../reducer';

function* getPaymentsReceiverSaga({
  type,
  payload: {
    provider,
  },
}: ReturnType<typeof getPaymentsReceiver>) {
  try {
    yield put(apiActions.request(type));

    const { isMainnet }: UserState = yield select(userSelector.getUser);

    const controllerAddress = contractsHelper.getContractData(
      ContractsNames.controller, isMainnet,
    ).address;
    const contract = contractsHelper.getControllerContract(provider, controllerAddress);

    const paymentsReceiverAddress: string = yield call(contract.methods.feeReceiver().call);
    yield put(
      setPaymentsReceiverAddress(paymentsReceiverAddress),
    );

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err, err?.response);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.ADMIN_GET_PAYMENTS_RECEIVER, getPaymentsReceiverSaga);
}
