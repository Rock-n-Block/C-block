import { createAction } from '@reduxjs/toolkit';

import {
  TAdminCheckIsAdminAction,
  TAdminSetPaymentsReceiverAction,
  TAdminSetPriceAction,
  TAdminGetPaymentsReceiverAction,
  TSetIsMainnetDisabledAction,
  TSendEmailAction,
  TSetIsFrozenUserAction,
  TAdminGetUserContractsAction,
} from 'types/store/admin';

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
export const getPaymentsReceiver = createAction<TAdminGetPaymentsReceiverAction>(
  actionTypes.ADMIN_GET_PAYMENTS_RECEIVER,
);
export const getIsMainnetDisabled = createAction(
  actionTypes.ADMIN_GET_IS_MAINNET_DISABLED,
);
export const setIsMainnetDisabled = createAction<TSetIsMainnetDisabledAction>(
  actionTypes.ADMIN_SET_IS_MAINNET_DISABLED,
);
export const getUsers = createAction(
  actionTypes.ADMIN_GET_USERS,
);
export const sendEmail = createAction<TSendEmailAction>(
  actionTypes.ADMIN_SEND_EMAIL,
);
export const setIsFrozenUser = createAction<TSetIsFrozenUserAction>(
  actionTypes.ADMIN_SET_IS_FROZEN_USER,
);
export const getUserContracts = createAction<TAdminGetUserContractsAction>(
  actionTypes.ADMIN_GET_USER_CONTRACTS,
);

export default {
  checkIsAdmin,
  setPaymentsReceiver,
  setPrice,
  getPaymentsReceiver,
  getIsMainnetDisabled,
  setIsMainnetDisabled,
  getUsers,
  sendEmail,
  setIsFrozenUser,
  getUserContracts,
};
