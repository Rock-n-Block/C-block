import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { merge } from 'lodash';
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
    updateUser: (state, action: PayloadAction<{
      userId: number;
      user: Partial<UserView>;
    }>) => {
      const users = [...state.users];
      const userId = users.findIndex(({ id }) => id === action.payload.userId);
      if (userId === -1) return state;
      const user = users[userId];
      const newUser = merge({}, user, action.payload.user);
      users.splice(userId, 1, newUser);
      return {
        ...state,
        users,
      };
    },
  },
});

export const {
  setState,
  setIsMainnetDisabled,
  setPaymentsReceiverAddress,
  setUsers,
  updateUser,
} = adminReducer.actions;

export default adminReducer.reducer;
