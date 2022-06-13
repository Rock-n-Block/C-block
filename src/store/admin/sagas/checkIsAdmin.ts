import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import apiActions from 'store/ui/actions';
import userSelector from 'store/user/selectors';
import { ContractsNames, UserState } from 'types';
import { setUser } from 'store/user/reducer';
import { contractsHelper } from 'utils';
import { checkIsAdmin } from '../actions';
import actionTypes from '../actionTypes';

function* checkIsAdminSaga({
  type,
  payload: {
    provider,
  },
}: ReturnType<typeof checkIsAdmin>) {
  try {
    yield put(apiActions.request(type));

    const { address: userWalletAddress, isMainnet }: UserState = yield select(userSelector.getUser);

    if (!userWalletAddress) {
      yield put(
        setUser({
          isAdmin: false,
        }),
      );
    } else {
      const controllerAddress = contractsHelper.getContractData(ContractsNames.controller, isMainnet).address;
      const contract = contractsHelper.getControllerContract(provider, controllerAddress);

      const DEFAULT_ADMIN_ROLE: string = yield call(contract.methods.DEFAULT_ADMIN_ROLE().call);
      const isAdmin: boolean = yield call(
        contract.methods.hasRole(DEFAULT_ADMIN_ROLE, userWalletAddress).call,
      );
      yield put(
        setUser({
          isAdmin,
        }),
      );
    }

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err, err?.response);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.ADMIN_CHECK_IS_ADMIN, checkIsAdminSaga);
}
