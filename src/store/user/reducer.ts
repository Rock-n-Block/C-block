import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, WalletProviders } from 'types';

const initialState: UserState = {
  id: -1,
  address: '',
  wallet: WalletProviders.init,
  isLight: false,
  isMainnet: false,

  registrationDate: '',
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

  isFrozen: false,

  permissions: {
    superAdmin: false,
    changeNetworkMode: false,
    setFeeReceiver: false,
    setPrice: false,
    contactUsers: false,
    freezeUsers: false,
    viewUsers: false,
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
    logout: (state) => ({
      ...initialState,
      address: state.address,
      isLight: state.isLight,
      isMainnet: state.isMainnet,
      wallet: state.wallet,
      countryCodes: state.countryCodes,
    }),
  },
});

export const {
  setUser,
  connectWalletState,
  disconnectWalletState,
  toggleTheme,
  toggleTestnet,
  setPermissions,
  logout,
} = userReducer.actions;

export default userReducer.reducer;
