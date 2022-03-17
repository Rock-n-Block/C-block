import { createAction } from '@reduxjs/toolkit';

import {
  TSetUpModalApproveAction,
  TUpdateAllowanceAction,
} from 'types';

import actionTypes from './actionTypes';

export const setUpModalApprove = createAction<TSetUpModalApproveAction>(
  actionTypes.SETUP_MODAL_APPROVE,
);
export const updateAllowance = createAction<TUpdateAllowanceAction>(
  actionTypes.SETUP_MODAL_UPDATE_ALLOWANCE,
);

export default {
  updateAllowance,
};
