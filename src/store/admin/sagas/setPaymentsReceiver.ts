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
import { setPaymentsReceiver } from '../actions';
import actionTypes from '../actionTypes';
import { setPaymentsReceiverAddress } from '../reducer';

function* setPaymentsReceiverSaga({
  type,
  payload: {
    provider,
    paymentsReceiverAddress,
  },
}: ReturnType<typeof setPaymentsReceiver>) {
  try {
    yield put(apiActions.request(type));

    const { address: userWalletAddress, isMainnet }: UserState = yield select(userSelector.getUser);

    const controllerAddress = contractsHelper.getContractData(
      ContractsNames.controller, isMainnet,
    ).address;
    const contract = contractsHelper.getControllerContract(provider, controllerAddress);

    yield call(
      contract.methods.setFeeReceiver(paymentsReceiverAddress).send,
      {
        from: userWalletAddress,
      },
    );
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
  yield takeLatest(actionTypes.ADMIN_SET_PAYMENTS_RECEIVER, setPaymentsReceiverSaga);
}
