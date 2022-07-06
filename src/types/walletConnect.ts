import {
  INetwork, IProvider, ISettings, INoNameContract,
} from '@amfi/connect-wallet/dist/interface';

export type TChainType = 'mainnet' | 'testnet';

export enum ContractsNames {
  celo = 'celo',
  cusd = 'cusd',
  tokenMintableFreezable = 'tokenMintableFreezable',
  tokenMintableNonFreezable = 'tokenMintableNonFreezable',
  tokenNonMintableFreezable = 'tokenNonMintableFreezable',
  tokenNonMintableNonFreezable = 'tokenNonMintableNonFreezable',
  lostKeyFactory = 'lostKeyFactory',
  crowdsaleSoftCappableBonusable = 'crowdsaleSoftCappableBonusable',
  crowdsaleSoftCappableNonBonusable = 'crowdsaleSoftCappableNonBonusable',
  crowdsaleNonSoftCappableBonusable = 'crowdsaleNonSoftCappableBonusable',
  crowdsaleNonSoftCappableNonBonusable = 'crowdsaleNonSoftCappableNonBonusable',
  weddingFactory = 'weddingFactory',
  lastWillFactory = 'lastWillFactory',
  controller = 'controller',
}
export type TContractsNames = keyof typeof ContractsNames;

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
