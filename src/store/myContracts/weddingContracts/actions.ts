import { createAction } from '@reduxjs/toolkit';

import {
  TInitWithdrawalAction,
  TApproveWithdrawalAction,
  TRejectWithdrawalAction,
  TInitDivorceAction,
  TApproveDivorceAction,
  TRejectDivorceAction,
  TGetFundsAfterDivorceAction,
} from 'types';

import actionTypes from './actionTypes';

export const initWithdrawal = createAction<TInitWithdrawalAction>(
  actionTypes.INIT_WITHDRAWAL,
);
export const approveWithdrawal = createAction<TApproveWithdrawalAction>(
  actionTypes.APPROVE_WITHDRAWAL,
);
export const rejectWithdrawal = createAction<TRejectWithdrawalAction>(
  actionTypes.REJECT_WITHDRAWAL,
);

export const initDivorce = createAction<TInitDivorceAction>(
  actionTypes.INIT_DIVORCE,
);
export const approveDivorce = createAction<TApproveDivorceAction>(
  actionTypes.APPROVE_DIVORCE,
);
export const rejectDivorce = createAction<TRejectDivorceAction>(
  actionTypes.REJECT_DIVORCE,
);
export const getFundsAfterDivorce = createAction<TGetFundsAfterDivorceAction>(
  actionTypes.GET_FUNDS_AFTER_DIVORCE,
);

export default {
  initWithdrawal,
  approveWithdrawal,
  rejectWithdrawal,

  initDivorce,
  approveDivorce,
  rejectDivorce,

  getFundsAfterDivorce,
};
