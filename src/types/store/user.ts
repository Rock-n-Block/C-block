import { WalletProviders } from '../walletConnect';

export type UserState = {
  address: string;
  wallet: WalletProviders;
  isLight: boolean;
  isMainnet: boolean;
};
