import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminState } from 'types';

const initialState: AdminState = {
  isMainnetDisabled: false,
  paymentsReceiverAddress: '',
};

export const adminReducer = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<Partial<AdminState>>) => ({
      ...state,
      ...action.payload,
    }),
    setIsMainnetDisabled: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isMainnetDisabled: action.payload,
    }),
    setPaymentsReceiverAddress: (state, action: PayloadAction<string>) => ({
      ...state,
      paymentsReceiverAddress: action.payload,
    }),
  },
});

export const {
  setState,
  setIsMainnetDisabled,
  setPaymentsReceiverAddress,
} = adminReducer.actions;

export default adminReducer.reducer;
