import { createAction } from '@reduxjs/toolkit';

import {
  TResetPasswordAction,
} from 'types';

import actionTypes from './actionTypes';

export const resetPassword = createAction<TResetPasswordAction>(
  actionTypes.USER_AUTH_RESET_PASSWORD,
);

export default {
  resetPassword,
};
