import { createAction } from '@reduxjs/toolkit';

import {
  TGetContractCreationPrice,
  TCreateTokenContractAction,
  TCreateLostKeyContractAction,
  TCreateWillContractAction,
  TCreateCrowdsaleContractAction,
  TCreateWeddingContractAction,
  TGetCrowdsaleContractAdditionalDataAction,
} from 'types';

import actionTypes from './actionTypes';

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
export const createWeddingContract = createAction<TCreateWeddingContractAction>(
  actionTypes.CREATE_WEDDING_CONTRACT,
);
