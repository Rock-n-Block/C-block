/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from '@reduxjs/toolkit';

import { TCreateTokenContractAction, TApproveAction, TCreateLostKeyContractAction } from 'types';

import actionTypes from './actionTypes';

// TODO: move to types
export const approve = createAction<TApproveAction>(actionTypes.APPROVE);
export const createTokenContract = createAction<TCreateTokenContractAction>(
  actionTypes.CREATE_TOKEN_CONTRACT,
);
export const createLostKeyContract = createAction<TCreateLostKeyContractAction>(
  actionTypes.CREATE_LOSTKEY_CONTRACT,
);
