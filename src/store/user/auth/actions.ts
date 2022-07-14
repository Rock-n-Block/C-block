import { createAction } from '@reduxjs/toolkit';

import {
  TResetPasswordAction,
  TConfirmResetPasswordAction,
  TChangePasswordAction,
  TRegisterAccountAction,
  TLogoutAction,
  TLoginAction,
  TUpdateProfileAction,
} from 'types';

import actionTypes from './actionTypes';

export const resetPassword = createAction<TResetPasswordAction>(
  actionTypes.USER_AUTH_RESET_PASSWORD,
);
export const confirmResetPassword = createAction<TConfirmResetPasswordAction>(
  actionTypes.USER_AUTH_CONFIRM_RESET_PASSWORD,
);
export const changePassword = createAction<TChangePasswordAction>(
  actionTypes.USER_AUTH_CHANGE_PASSWORD,
);
export const registerAccount = createAction<TRegisterAccountAction>(
  actionTypes.USER_AUTH_REGISTER_ACCOUNT,
);
export const logout = createAction<TLogoutAction>(
  actionTypes.USER_AUTH_LOGOUT,
);
export const login = createAction<TLoginAction>(
  actionTypes.USER_AUTH_LOGIN,
);
export const checkAuthentication = createAction(
  actionTypes.USER_AUTH_CHECK_AUTHENTICATION,
);
export const updateProfile = createAction<TUpdateProfileAction>(
  actionTypes.USER_AUTH_UPDATE_PROFILE,
);
export const getCountryCodes = createAction(
  actionTypes.USER_GET_COUNTRY_CODES,
);

export default {
  resetPassword,
  confirmResetPassword,
  changePassword,
  registerAccount,
  logout,
  login,
  checkAuthentication,
  updateProfile,
  getCountryCodes,
};
