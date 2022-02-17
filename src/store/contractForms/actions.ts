/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from '@reduxjs/toolkit';

import {
  TApproveAction,
  TGetContractCreationPrice,
  TCreateTokenContractAction,
  TCreateLostKeyContractAction,
  TCreateWillContractAction,
  TCreateCrowdsaleContractAction,
  TGetErc20SymbolAction,
  TGetCrowdsaleContractAdditionalDataAction,
} from 'types';

import actionTypes from './actionTypes';

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
export const createCrowdsaleContract = createAction<TCreateCrowdsaleContractAction>(
  actionTypes.CREATE_CROWDSALE_CONTRACT,
);
export const getCrowdsaleContractAdditionalData = createAction<TGetCrowdsaleContractAdditionalDataAction>(
  actionTypes.GET_CROWDSALE_CONTRACT_ADDITIONAL_DATA,
);

export const getErc20Symbol = createAction<TGetErc20SymbolAction>(
  actionTypes.GET_ERC20_SYMBOL,
);
