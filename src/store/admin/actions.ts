import { createAction } from '@reduxjs/toolkit';

import {
  TAdminCheckIsAdminAction,
} from 'types';

import actionTypes from './actionTypes';

export const checkIsAdmin = createAction<TAdminCheckIsAdminAction>(
  actionTypes.ADMIN_CHECK_IS_ADMIN,
);

export default {
  checkIsAdmin,
};
