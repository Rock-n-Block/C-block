import { createAction } from '@reduxjs/toolkit';

import { TGetFinishedContractsAction, TTransferRewardAction } from 'types';

import actionTypes from './actionTypes';

export const getFinishedContracts = createAction<TGetFinishedContractsAction>(
  actionTypes.GET_FINISHED_CONTRACTS,
);

export const transferReward = createAction<TTransferRewardAction>(
  actionTypes.TRANSFER_REWARD,
);

export default {
  getFinishedContracts,
  transferReward,
};
