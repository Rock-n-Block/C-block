import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import apiActions from 'store/ui/actions';
import { authApi } from 'store/api/apiRequestBuilder';
import { setUser } from 'store/user/reducer';
import { AxiosResponse } from 'axios';
import { setNotification } from 'utils';
import { TGetUserDataReturnType } from 'store/api/auth.types';
import { logout } from '../actions';
import actionTypes from '../actionTypes';

export function* getUserDataSaga({
  type,
  payload: {
    showErrorNotification,
  },
}: ReturnType<typeof logout>) {
  try {
    yield put(apiActions.request(type));

    const {
      data: {
        date_joined: registrationDate,
        email: registrationEmail,
        owner_address: registrationWalletAddress,
        avatar: avatarUrl,
        city,
        company,
        country,
        name: userName,
        office,
        phone_number: phoneNumber,
        street,
        building,
        zipcode,
        is_completed_profile: isCompletedProfile,
        freezed: isFrozen,
        id,
        permissions,
      },
    }: AxiosResponse<TGetUserDataReturnType> = yield call(
      authApi.getUserData,
    );

    yield put(setUser({
      id,
      registrationDate,
      registrationEmail,
      registrationWalletAddress,
      profile: {
        avatarUrl: avatarUrl ? `${process.env.REACT_APP_BACKEND_ORIGIN}${avatarUrl}` : '',
        city: city || '',
        company: company || '',
        building: building || '',
        country,
        office: office || '',
        street: street || '',
        telephone: {
          body: phoneNumber || '',
          countryCode: phoneNumber || '',
        },
        userName: userName || '',
        zipcode: zipcode || '',
        isCompletedProfile,
      },
      isFrozen,
      permissions: {
        superAdmin: permissions.contract_super_admin,
        changeNetworkMode: permissions.can_change_network_mode,
        setFeeReceiver: permissions.can_change_payment_addresses,
        setPrice: permissions.can_change_price,
        contactUsers: permissions.can_contact_users,
        freezeUsers: permissions.can_freeze_users,
        viewUsers: permissions.can_view_users,
      },
    }));
    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err, err.response);
    const axiosRequestError = Object.values(err?.response?.data).join('; ');
    if (showErrorNotification) {
      setNotification({
        type: 'error',
        message: `Couldn't get user's registration email and wallet address. ${axiosRequestError}`,
      });
    }
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(
    actionTypes.USER_AUTH_GET_USER_DATA,
    getUserDataSaga,
  );
}
