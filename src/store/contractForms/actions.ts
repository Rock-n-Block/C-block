/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from '@reduxjs/toolkit';

import {
  TApproveAction,
  TGetContractCreationPrice,
  TCreateTokenContractAction,
  TCreateLostKeyContractAction,
  TCreateWillContractAction,
} from 'types';

import actionTypes from './actionTypes';

// TODO: move to types
export const approve = createAction<TApproveAction>(actionTypes.APPROVE);
export const getContractCreationPrice = createAction<TGetContractCreationPrice>(
  actionTypes.GET_CONTRACT_CREATION_PRICE,
);
export const createTokenContract = createAction<TCreateTokenContractAction>(
  actionTypes.CREATE_TOKEN_CONTRACT,
);
export const createLostKeyContract = createAction<TCreateLostKeyContractAction>(
  actionTypes.CREATE_LOSTKEY_CONTRACT,
);
export const createWillContract = createAction<TCreateWillContractAction>(
  actionTypes.CREATE_WILL_CONTRACT,
);
