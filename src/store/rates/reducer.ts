import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  RatesState,
} from 'types';

export const initialState: RatesState = {
  rates: {
    celo: '',
    cusd: '',
  },
};

export const ratesReducer = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    setRates: (
      state,
      action: PayloadAction<Partial<RatesState['rates']>>,
    ) => ({
      ...state,
      rates: {
        ...state.rates,
        ...action.payload,
      },
    }),
  },
});

export const {
  setRates,
} = ratesReducer.actions;

export default ratesReducer.reducer;
