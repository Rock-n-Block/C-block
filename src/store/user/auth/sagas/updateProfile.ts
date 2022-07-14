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
import { updateProfile } from '../actions';
import actionTypes from '../actionTypes';

export function* updateProfileSaga({
  type,
  payload,
}: ReturnType<typeof updateProfile>) {
  try {
    yield put(apiActions.request(type));

    const {
      data: {
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
        zipcode,
        is_completed_profile: isCompletedProfile,
      },
    }: AxiosResponse<TGetUserDataReturnType> = yield call(
      authApi.updateProfile,
      {
        city: payload.city,
        company: payload.company,
        country: payload.country,
        name: payload.userName,
        office: payload.office,
        phone_number: `${payload.telephone.countryCode}${payload.telephone.body}`,
        street: payload.street,
        zipcode: payload.zipcode,
      },
      // new File([payload.avatarUrl], 'avatar.png', { type: 'image/png' }),
      payload.avatar,
    );

    yield put(setUser({
      registrationEmail,
      registrationWalletAddress,
      profile: {
        avatarUrl: avatarUrl || '',
        city: city || '',
        company: company || '',
        building: '', // TODO: ??
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
    }));
    setNotification({
      type: 'success',
      message: 'Profile successfully updated',
    });
    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err, err.response);
    const axiosRequestError = Object.values(err?.response?.data).join('; ');
    setNotification({
      type: 'error',
      message: `${axiosRequestError}`,
    });
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(
    actionTypes.USER_AUTH_UPDATE_PROFILE,
    updateProfileSaga,
  );
}
