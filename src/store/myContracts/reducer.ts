import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  // ContractFormsState,
  // TokenContract,
  MyContractsState,
} from 'types';

export const initialState: MyContractsState = {
  contracts: [],
};

export const myContractsReducer = createSlice({
  name: 'myContracts',
  initialState,
  reducers: { // TODO: remove this shit
    setMyContracts: (state, action: PayloadAction<{}>) => ({
      ...state,
      tokenContract: action.payload,
    }),
    // TODO: remove this shit
    deleteTokenContractForm: (state) => ({
      ...state,
      // tokenContract: initialState.tokenContract,
    }),
  },
});

export const {
  setMyContracts,
  deleteTokenContractForm,
} = myContractsReducer.actions;

export default myContractsReducer.reducer;
