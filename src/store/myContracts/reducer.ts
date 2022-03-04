import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IContractsCard } from 'pages/MyContracts/MyContracts.helpers';
import {
  MyContractsState,
} from 'types';

export const initialState: MyContractsState = {
  contracts: [],
};

export const myContractsReducer = createSlice({
  name: 'myContracts',
  initialState,
  reducers: {
    setMyContracts: (state, action: PayloadAction<IContractsCard[]>) => ({
      ...state,
      contracts: action.payload,
    }),
  },
});

export const {
  setMyContracts,
} = myContractsReducer.actions;

export default myContractsReducer.reducer;
