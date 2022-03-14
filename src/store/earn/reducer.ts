import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EarnState, TContractAddress, TFinishedContract } from 'types';

export const initialState: EarnState = {
  items: [],
};

export const earnReducer = createSlice({
  name: 'earn',
  initialState,
  reducers: {
    setFinishedContracts: (
      state: EarnState,
      action: PayloadAction<TFinishedContract[]>,
    ) => ({
      ...state,
      items: action.payload,
    }),
    removeFinishedContract: (
      state: EarnState,
      action: PayloadAction<TContractAddress>,
    ) => ({
      ...state,
      items: state.items.filter(
        ({ address }) => action.payload.contractAddress.toLowerCase() !== address.toLowerCase(),
      ),
    }),
  },
});

export const {
  setFinishedContracts,
  removeFinishedContract,
} = earnReducer.actions;

export default earnReducer.reducer;
