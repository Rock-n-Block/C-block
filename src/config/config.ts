/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContractsNames, IConnectWallet, IContracts } from 'types';
import {
  bep20Abi,
  tokenMintableFreezableAbi,
  tokenMintableNonFreezableAbi,
  tokenNonMintableFreezableAbi,
  tokenNonMintableNonFreezableAbi,
  lostKeyFactoryAbi,
  crowdsaleSoftCappableBonusableAbi,
  crowdsaleSoftCappableNonBonusableAbi,
  crowdsaleNonSoftCappableBonusableAbi,
  crowdsaleNonSoftCappableNonBonusableAbi,
  weddingFactoryAbi,
  lastWillFactoryAbi,
  controllerAbi,
} from './abi';

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

export const contracts: IContracts = {
  type: 'mainnet',
  names: Object.keys(ContractsNames),
  decimals: 18,
  params: {
    celo: {
      mainnet: {
        address: '0x471EcE3750Da237f93B8E339c536989b8978a438',
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
    lostKeyFactory: {
      mainnet: {
        address: '',
        abi: lostKeyFactoryAbi,
      },
      testnet: {
        address: '0x62f89dE5B145f2A8f0b08Ecea7ae8A41C52efBe3',
        abi: lostKeyFactoryAbi,
      },
    },
    lastWillFactory: {
      mainnet: {
        address: '',
        abi: lastWillFactoryAbi,
      },
      testnet: {
        address: '0x7727c1D5Ad9794bB923d399862DA3fCf47270aCE',
        abi: lastWillFactoryAbi,
      },
    },

    crowdsaleSoftCappableBonusable: {
      mainnet: {
        address: '',
        abi: crowdsaleSoftCappableBonusableAbi,
      },
      testnet: {
        address: '0x7C5d7986259354a80bB83c101754587Bfc3bBCAc',
        abi: crowdsaleSoftCappableBonusableAbi,
      },
    },
    crowdsaleSoftCappableNonBonusable: {
      mainnet: {
        address: '',
        abi: crowdsaleSoftCappableNonBonusableAbi,
      },
      testnet: {
        address: '0x9d1D9c4E4F622708210Ce4C7de7b76d6fC087733',
        abi: crowdsaleSoftCappableNonBonusableAbi,
      },
    },
    crowdsaleNonSoftCappableBonusable: {
      mainnet: {
        address: '',
        abi: crowdsaleNonSoftCappableBonusableAbi,
      },
      testnet: {
        address: '0x4f96423a3aB01F821c98E9a6D72ca6fB6c9ED49D',
        abi: crowdsaleNonSoftCappableBonusableAbi,
      },
    },
    crowdsaleNonSoftCappableNonBonusable: {
      mainnet: {
        address: '',
        abi: crowdsaleNonSoftCappableNonBonusableAbi,
      },
      testnet: {
        address: '0x8129A40EA8fA34C342b04BE1a9Ba379148F99D7F',
        abi: crowdsaleNonSoftCappableNonBonusableAbi,
      },
    },
    weddingFactory: {
      mainnet: {
        address: '',
        abi: weddingFactoryAbi,
      },
      testnet: {
        address: '0x6584C8feB93c8d7B79C0403E042822f81538557b',
        abi: weddingFactoryAbi,
      },
    },
    // all the contracts controller (to setPrice, changeManagementAddress etc.)
    controller: {
      mainnet: {
        address: '',
        abi: controllerAbi,
      },
      testnet: {
        address: '0x6450A6a3800b09da0e195aAc71FA061277CFcfCd',
        abi: controllerAbi,
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
