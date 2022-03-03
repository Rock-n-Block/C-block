import { createAction } from '@reduxjs/toolkit';

import {
  TGetMyContractsAction,
} from 'types';

import actionTypes from './actionTypes';

export const getMyContracts = createAction<TGetMyContractsAction>(actionTypes.GET_MY_CONTRACTS);

export default {
  getMyContracts,
};
