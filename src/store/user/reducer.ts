/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, WalletProviders } from 'types';

const initialState: UserState = {
  address: '',
  wallet: WalletProviders.init,
  isLight: false,
  isMainnet: true,
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleTestnet: (state) => ({
      ...state,
      isMainnet: !state.isMainnet,
    }),
    toggleTheme: (state) => ({
      ...state,
      isLight: !state.isLight,
    }),
    connectWalletState: (state, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    disconnectWalletState: (state) => {
      localStorage.removeItem('walletconnect');
      return {
        ...state,
        wallet: WalletProviders.init,
        address: '',
      };
    },
  },
});

export const {
  connectWalletState, disconnectWalletState, toggleTheme, toggleTestnet,
} = userReducer.actions;

export default userReducer.reducer;
