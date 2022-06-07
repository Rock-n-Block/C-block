import { createAction } from '@reduxjs/toolkit';

import {
  TResetPasswordAction,
  TConfirmResetPasswordAction,
  TRegisterAccountAction,
  TLoginAction,
} from 'types';

import actionTypes from './actionTypes';

export const resetPassword = createAction<TResetPasswordAction>(
  actionTypes.USER_AUTH_RESET_PASSWORD,
);
export const confirmResetPassword = createAction<TConfirmResetPasswordAction>(
  actionTypes.USER_AUTH_CONFIRM_RESET_PASSWORD,
);
export const registerAccount = createAction<TRegisterAccountAction>(
  actionTypes.USER_AUTH_REGISTER_ACCOUNT,
);
export const logout = createAction(
  actionTypes.USER_AUTH_LOGOUT,
);
export const login = createAction<TLoginAction>(
  actionTypes.USER_AUTH_LOGIN,
);

export default {
  resetPassword,
  confirmResetPassword,
  registerAccount,
  logout,
};
