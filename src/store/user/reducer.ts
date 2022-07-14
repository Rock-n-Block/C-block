import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, WalletProviders } from 'types';

const initialState: UserState = {
  address: '',
  wallet: WalletProviders.init,
  isLight: false,
  isMainnet: false,

  email: '',
  registrationEmail: '',
  registrationWalletAddress: '',
  profile: {
    userName: '',
    company: '',
    telephone: {
      countryCode: '',
      body: '',
    },
    country: '',
    city: '',
    street: '',
    office: '',
    building: '',
    zipcode: '',
    avatarUrl: '',
    avatar: {} as File,

    isCompletedProfile: true,
  },

  countryCodes: [],

  permissions: {
    setFeeReceiver: false,
    setPrice: false,
    superAdmin: false,
  },
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    resetState: (state) => ({
      ...state,
      ...initialState,
    }),
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
    setPermissions: (state, action: PayloadAction<Partial<UserState['permissions']>>) => ({
      ...state,
      permissions: {
        ...state.permissions,
        ...action.payload,
      },
    }),
  },
});

export const {
  setUser,
  resetState,
  connectWalletState,
  disconnectWalletState,
  toggleTheme,
  toggleTestnet,
  setPermissions,
} = userReducer.actions;

export default userReducer.reducer;
