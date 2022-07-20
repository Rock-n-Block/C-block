import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import { AxiosError } from 'axios';

import apiActions from 'store/ui/actions';
import userSelector from 'store/user/selectors';
import adminSelectors from 'store/admin/selectors';
import {
  ContractsNames, Permissions, UserState, UserView,
} from 'types';
import { contractsHelper, setNotification } from 'utils';
import { roleSystemApi } from 'store/api/apiRequestBuilder';
import { PermissionsBackend } from 'store/api/auth.types';
import { updatePermissions } from '../actions';
import actionTypes from '../actionTypes';
import { updateUser } from '../reducer';

const mapPermissionsToPermissionsBackend: Record<keyof Permissions, keyof PermissionsBackend> = {
  changeNetworkMode: 'can_change_network_mode',
  contactUsers: 'can_contact_users',
  freezeUsers: 'can_freeze_users',
  setFeeReceiver: 'can_change_payment_addresses',
  setPrice: 'can_change_price',
  superAdmin: 'contract_super_admin',
  viewUsers: 'can_view_users',
};

function* updatePermissionsSaga({
  type,
  payload: {
    provider,
    userId,
    permissions,
  },
}: ReturnType<typeof updatePermissions>) {
  try {
    yield put(apiActions.request(type));

    const { address: userWalletAddress, isMainnet }: UserState = yield select(userSelector.getUser);
    const userData: UserView = yield select(adminSelectors.selectUser(userId));

    const controllerAddress = contractsHelper.getContractData(
      ContractsNames.controller, isMainnet,
    ).address;
    const contract = contractsHelper.getControllerContract(provider, controllerAddress);

    console.log('UPDATE', permissions);

    if (permissions.setFeeReceiver !== undefined) {
      yield call(
        contract.methods.editCanSetFeeReceiver(
          [userData.ownerAddress],
          [permissions.setFeeReceiver],
        ).send,
        {
          from: userWalletAddress,
        },
      );
    }

    if (permissions.setPrice !== undefined) {
      yield call(
        contract.methods.editCanSetPrice(
          [userData.ownerAddress],
          [permissions.setPrice],
        ).send,
        {
          from: userWalletAddress,
        },
      );
    }

    const serializedPermissions = Object.entries(permissions).reduce((
      accumulator,
      [key, value]: [keyof Permissions, boolean],
    ) => {
      accumulator[mapPermissionsToPermissionsBackend[key]] = value;
      return accumulator;
    }, {} as Partial<PermissionsBackend>);

    yield call(
      roleSystemApi.updatePermissions,
      {
        id: userId,
        ...serializedPermissions,
      },
    );

    yield put(
      updateUser({
        userId,
        user: {
          ...userData,
          permissions: {
            ...userData.permissions,
            ...permissions,
          },
        },
      }),
    );

    setNotification({
      type: 'success',
      message: `Successfully updated permissions for ${userData.email} (userId: ${userId})`,
    });

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err, err?.response);
    if (err.isAxiosError) {
      const error = err as AxiosError;
      const axiosResponseError = Object.values(error.response.data).join('\n');
      setNotification({
        type: 'error',
        message: axiosResponseError,
      });
    } else {
      setNotification({
        type: 'error',
        message: 'Error occurred while updating permissions',
      });
    }
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.ADMIN_UPDATE_PERMISSIONS, updatePermissionsSaga);
}
