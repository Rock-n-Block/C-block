import { createAction } from '@reduxjs/toolkit';

import { TGetRatesAction } from 'types';

import actionTypes from './actionTypes';

export const getRates = createAction<TGetRatesAction>(
  actionTypes.GET_RATES,
);

export default {
  getRates,
};
