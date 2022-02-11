/* eslint-disable @typescript-eslint/no-explicit-any */
import { INetwork, IProvider, ISettings } from '@amfi/connect-wallet/dist/interface';

export interface OptionalClassNameProp {
  className?: string;
}
export interface IConnectWallet {
  network: INetwork;
  provider: {
    [index: string]: IProvider;
  };
  settings: ISettings;
}
export interface IChainConfig {
  name: string;
  id: number;
  rpc: string;
  tx: {
    link: string;
  };
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExp: string;
}

export interface IContracts {
  decimals: number;
  names: string[];
  type: string;
  params: {
    [index: string]: {
      mainnet: {
        address: string;
        abi: any[];
      };
      testnet: {
        address: string;
        abi: any[];
      };
    };
  };
}

// eslint-disable-next-line no-shadow
export enum WalletProviders {
  walletConnect = 'WalletConnect',
  celo = 'Celo',
  metamask = 'MetaMask',
  init = '',
}

export type TNullable<T> = T | null;
export type TOptionable<T> = T | undefined;

export * from './store';
