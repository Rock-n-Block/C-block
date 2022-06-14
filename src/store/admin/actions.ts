import { createAction } from '@reduxjs/toolkit';

import {
  TAdminCheckIsAdminAction,
  TAdminSetPaymentsReceiverAction,
  TAdminSetPriceAction,
} from 'types';

import actionTypes from './actionTypes';

export const checkIsAdmin = createAction<TAdminCheckIsAdminAction>(
  actionTypes.ADMIN_CHECK_IS_ADMIN,
);

export const setPaymentsReceiver = createAction<TAdminSetPaymentsReceiverAction>(
  actionTypes.ADMIN_SET_PAYMENTS_RECEIVER,
);

export const setPrice = createAction<TAdminSetPriceAction>(
  actionTypes.ADMIN_SET_PRICE,
);

export default {
  checkIsAdmin,
  setPaymentsReceiver,
  setPrice,
};
