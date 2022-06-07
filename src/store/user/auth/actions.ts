import { createAction } from '@reduxjs/toolkit';

import {
  TResetPasswordAction,
  TConfirmResetPasswordAction,
} from 'types';

import actionTypes from './actionTypes';

export const resetPassword = createAction<TResetPasswordAction>(
  actionTypes.USER_AUTH_RESET_PASSWORD,
);
export const confirmResetPassword = createAction<TConfirmResetPasswordAction>(
  actionTypes.USER_AUTH_CONFIRM_RESET_PASSWORD,
);

export default {
  resetPassword,
  confirmResetPassword,
};
