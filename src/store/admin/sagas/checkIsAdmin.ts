import {
  all,
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import apiActions from 'store/ui/actions';
import userSelector from 'store/user/selectors';
import { ContractsNames, UserState } from 'types';
import { setPermissions } from 'store/user/reducer';
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

    if (userWalletAddress) {
      const controllerAddress = contractsHelper.getContractData(ContractsNames.controller, isMainnet).address;
      const contract = contractsHelper.getControllerContract(provider, controllerAddress);

      const [
        canSetFeeReceiver,
        canSetPrice,
        ownerAddress,
      ]: [boolean, boolean, string] = yield all(
        [
          call(contract.methods.canSetFeeReceiver(userWalletAddress).call),
          call(contract.methods.canSetPrice(userWalletAddress).call),
          call(contract.methods.owner().call),
        ],
      );

      yield put(
        setPermissions({
          setFeeReceiver: canSetFeeReceiver,
          setPrice: canSetPrice,
          superAdmin: userWalletAddress.toLowerCase() === ownerAddress.toLowerCase(),
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
