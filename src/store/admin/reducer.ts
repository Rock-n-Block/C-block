import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { TGetUsersListReturnType } from 'store/api/roleSystem.types';
import { AdminState, UserView } from 'types';

const initialState: AdminState = {
  isMainnetDisabled: false,
  paymentsReceiverAddress: '',
  users: [],
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

    setUsers: (state, action: PayloadAction<UserView[]>) => ({
      ...state,
      users: action.payload,
    }),
  },
});

export const {
  setState,
  setIsMainnetDisabled,
  setPaymentsReceiverAddress,
  setUsers,
} = adminReducer.actions;

export default adminReducer.reducer;
