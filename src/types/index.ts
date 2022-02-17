/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  INetwork, IProvider, ISettings, INoNameContract,
} from '@amfi/connect-wallet/dist/interface';

export type TChainType = 'mainnet' | 'testnet';

export enum ContractsNames {
  celo = 'celo',
  tokenMintableFreezable = 'tokenMintableFreezable',
  tokenMintableNonFreezable = 'tokenMintableNonFreezable',
  tokenNonMintableFreezable = 'tokenNonMintableFreezable',
  tokenNonMintableNonFreezable = 'tokenNonMintableNonFreezable',
  lostKeyFactory = 'lostKeyFactory',
  crowdsaleSoftCappableBonusable = 'crowdsaleSoftCappableBonusable',
  crowdsaleSoftCappableNonBonusable = 'crowdsaleSoftCappableNonBonusable',
  crowdsaleNonSoftCappableBonusable = 'crowdsaleNonSoftCappableBonusable',
  crowdsaleNonSoftCappableNonBonusable = 'crowdsaleNonSoftCappableNonBonusable',
}
export type TContractsNames = keyof typeof ContractsNames;

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
    [contractName in ContractsNames]: {
      [chainType in TChainType]: INoNameContract;
    };
  };
}

export enum WalletProviders {
  walletConnect = 'WalletConnect',
  celo = 'Celo',
  metamask = 'MetaMask',
  init = '',
}

export type TNullable<T> = T | null;
export type TOptionable<T> = T | undefined;

export * from './store';
