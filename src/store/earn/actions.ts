import { createAction } from '@reduxjs/toolkit';

import { TGetFinishedContractsAction } from 'types';

import actionTypes from './actionTypes';

export const getFinishedContracts = createAction<TGetFinishedContractsAction>(
  actionTypes.GET_FINISHED_CONTRACTS,
);

export default {
  getFinishedContracts,
};
