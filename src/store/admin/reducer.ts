import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminState } from 'types';

const initialState: AdminState = {
  isMainnetDisabled: false,
  managementAddress: '',
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
    setManagementAddress: (state, action: PayloadAction<string>) => ({
      ...state,
      managementAddress: action.payload,
    }),
  },
});

export const {
  setState,
  setIsMainnetDisabled,
  setManagementAddress,
} = adminReducer.actions;

export default adminReducer.reducer;
