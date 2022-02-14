/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IConnectWallet, IContracts } from 'types';
import store from 'store/configureStore';
import tokenMintableFreezableAbi from './abi/tokenMintableFreezable';
import tokenMintableNonFreezableAbi from './abi/tokenMintableNonFreezable';
import tokenNonMintableFreezableAbi from './abi/tokenNonMintableFreezable';
import tokenNonMintableNonFreezableAbi from './abi/tokenNonMintableNonFreezable';
import { bep20Abi } from './abi';

export * from './constants';

export const chains: {
  [key: string]: {
    name: string;
    chainId: number;
    provider: {
      [key: string]: any;
    };
    img?: any;
  };
} = {
  Trust: {
    name: 'Trust Wallet',
    chainId: 1,
    provider: {
      WalletConnect: {
        name: 'WalletConnect',
        useProvider: 'bridge',
        provider: {
          bridge: {
            bridge: 'https://bridge.walletconnect.org',
          },
        },
      },
    },
  },
  'Celo-Chain': {
    name: 'Celo',
    chainId: 42220,
    provider: {
      MetaMask: { name: 'MetaMask' },
      WalletConnect: {
        name: 'WalletConnect',
        useProvider: 'rpc',
        provider: {
          rpc: {
            rpc: {
              42220: 'https://forno.celo.org/',
            },
            chainId: 42220,
          },
        },
      },
    },
  },
};

export const connectWallet = (newChainName: string): IConnectWallet => {
  const chain = chains[newChainName];
  return {
    network: {
      chainName: chain.name,
      chainID: chain.chainId,
    },
    provider: chain.provider,
    settings: { providerType: true },
  };
};

// eslint-disable-next-line no-shadow
export enum ContractsNames {
  tokenMintableFreezable = 'tokenMintableFreezable',
  tokenMintableNonFreezable = 'tokenMintableNonFreezable',
  tokenNonMintableFreezable = 'tokenNonMintableFreezable',
  tokenNonMintableNonFreezable = 'tokenNonMintableNonFreezable',
}

export const contracts: IContracts = {
  type: 'mainnet',
  names: Object.keys(ContractsNames),
  decimals: 18,
  params: {
    celo: {
      mainnet: {
        address: '',
        abi: bep20Abi,
      },
      testnet: {
        address: '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9',
        abi: bep20Abi,
      },
    },
    tokenMintableFreezable: {
      mainnet: {
        address: '',
        abi: tokenMintableFreezableAbi,
      },
      testnet: {
        address: '0x5A3A9c31151A5A125F6baBaDc1e997017cAC1eeC',
        abi: tokenMintableFreezableAbi,
      },
    },
    tokenMintableNonFreezable: {
      mainnet: {
        address: '',
        abi: tokenMintableNonFreezableAbi,
      },
      testnet: {
        address: '0x9B8797085E0c916E25a860Ad3015F6A8a5ff5f37',
        abi: tokenMintableNonFreezableAbi,
      },
    },
    tokenNonMintableFreezable: {
      mainnet: {
        address: '',
        abi: tokenNonMintableFreezableAbi,
      },
      testnet: {
        address: '0x9D61A75467BF17ea3947cc52fCdF5285e8A202f3',
        abi: tokenNonMintableFreezableAbi,
      },
    },
    tokenNonMintableNonFreezable: {
      mainnet: {
        address: '',
        abi: tokenNonMintableNonFreezableAbi,
      },
      testnet: {
        address: '0x568EE75009950B15e9e91a9A99DedF749f3AcBBf',
        abi: tokenNonMintableNonFreezableAbi,
      },
    },
  },
};

export const contractsProxy = new Proxy(contracts, {
  set(target, value) {
    target.type = value ? 'mainnet' : 'testnet';
    return true;
  },
});

export const chainsProxy = new Proxy(chains, {
  set(target, value) {
    target['Trust'].chainId = value ? 1 : 0;
    target['Celo-Chain'].chainId = value ? 42220 : 44787;
    target['Celo-Chain'].provider.WalletConnect.provider.rpc.rpc = value ? 'https://forno.celo.org/'
      : 'https://alfajores-forno.celo-testnet.org/';
    return true;
  },
});

function getProduction() {
  contractsProxy.type = store.store.getState().user.isMainnet ? 'mainnet' : 'testnet';
  chainsProxy['Trust'].chainId = store.store.getState().user.isMainnet ? 1 : 0;
  chainsProxy['Celo-Chain'].chainId = store.store.getState().user.isMainnet ? 42220 : 44787;
  chainsProxy['Celo-Chain'].provider.WalletConnect.provider.rpc.rpc = store.store.getState().user.isMainnet
    ? { 42220: 'https://forno.celo.org/' }
    : { 44787: 'https://alfajores-forno.celo-testnet.org/' };
  chainsProxy['Celo-Chain'].provider.WalletConnect.provider.rpc.chainId = store.store.getState().user.isMainnet
    ? 42220 : 44787;
  return store.store.getState().user.isMainnet;
}

store.store.subscribe(getProduction);
