import { createAction } from '@reduxjs/toolkit';

import {
  TApproveAction,
  TGetErc20SymbolAction,
} from 'types';

import actionTypes from './actionTypes';

export const approve = createAction<TApproveAction>(actionTypes.APPROVE);

export const getErc20Symbol = createAction<TGetErc20SymbolAction>(
  actionTypes.GET_ERC20_SYMBOL,
);
