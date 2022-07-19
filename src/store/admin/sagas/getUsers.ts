import { AxiosResponse } from 'axios';
import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { roleSystemApi } from 'store/api/apiRequestBuilder';
import { TGetUsersListReturnType } from 'store/api/roleSystem.types';

import apiActions from 'store/ui/actions';
import { getUsers } from '../actions';
import actionTypes from '../actionTypes';
import { setUsers } from '../reducer';

function* getUsersSaga({
  type,
}: ReturnType<typeof getUsers>) {
  try {
    yield put(apiActions.request(type));

    const {
      data,
    }: AxiosResponse<TGetUsersListReturnType> = yield call(roleSystemApi.getUsersList);
    yield put(
      setUsers(data.map(({
        id,
        email,
        owner_address: ownerAddress,
        date_joined: registrationDate,
        name: userName,
        company,
        phone_number: phoneNumber,
        country,
        city,
        street,
        office,
        building,
        zipcode,
        avatar: avatarUrl,
        freezed: isFrozen,
        is_completed_profile: isCompletedProfile,
        permissions,
      }) => ({
        id,
        email,
        ownerAddress,
        registrationDate,
        userName: userName || '',
        company: company || '',
        phoneNumber: phoneNumber || '',
        country,
        city: city || '',
        street: street || '',
        office: office || '',
        building: building || '',
        zipcode: zipcode || '',
        avatarUrl: avatarUrl ? `${process.env.REACT_APP_BACKEND_ORIGIN}${avatarUrl}` : '',
        isFrozen,
        isCompletedProfile,
        permissions: {
          superAdmin: permissions.contract_super_admin,
          changeNetworkMode: permissions.can_change_network_mode,
          setFeeReceiver: permissions.can_change_payment_addresses,
          setPrice: permissions.can_change_price,
          contactUsers: permissions.can_contact_users,
          freezeUsers: permissions.can_freeze_users,
          viewUsers: permissions.can_view_users,
        },
        contracts: {
          crowdsales: [],
          lastwills: [],
          lostkeys: [],
          tokens: [],
          weddings: [],
        },
      }))),
    );

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err, err?.response);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.ADMIN_GET_USERS, getUsersSaga);
}
