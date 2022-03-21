import { createAction } from '@reduxjs/toolkit';

import {
  TSetUpModalApproveAction,
  TUpdateAllowanceAction,
  TGetSetUpModalTokenAddressesAction,
  TSetUpModalAddTokensAction,
} from 'types';

import actionTypes from './actionTypes';

export const setUpModalApprove = createAction<TSetUpModalApproveAction>(
  actionTypes.SETUP_MODAL_APPROVE,
);
export const updateAllowance = createAction<TUpdateAllowanceAction>(
  actionTypes.SETUP_MODAL_UPDATE_ALLOWANCE,
);
export const getSetUpModalTokenAddresses = createAction<TGetSetUpModalTokenAddressesAction>(
  actionTypes.GET_SETUP_MODAL_TOKEN_ADDRESSES,
);
export const setUpModalAddTokens = createAction<TSetUpModalAddTokensAction>(
  actionTypes.SETUP_MODAL_ADD_TOKENS,
);

export default {
  setUpModalApprove,
  updateAllowance,
  getSetUpModalTokenAddresses,
  setUpModalAddTokens,
};
