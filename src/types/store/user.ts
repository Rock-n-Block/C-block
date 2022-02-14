import { WalletProviders } from 'types';

export type UserState = {
  address: string;
  wallet: WalletProviders;
  isLight: boolean;
  isMainnet: boolean;
};
