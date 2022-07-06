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
    cusd: {
      mainnet: {
        address: '0x765DE816845861e75A25fCA122bb6898B8B1282a',
        abi: bep20Abi,
      },
      testnet: {
        address: '0x874069fa1eb16d44d622f2e0ca25eea172369bc1',
        abi: bep20Abi,
      },
    },
    tokenMintableFreezable: {
      mainnet: {
        address: '',
        abi: tokenMintableFreezableAbi,
      },
      testnet: {
        address: '0x840714c57F93Fca2446Cc9DD8d70B330E3f000bc',
        abi: tokenMintableFreezableAbi,
      },
    },
    tokenMintableNonFreezable: {
      mainnet: {
        address: '',
        abi: tokenMintableNonFreezableAbi,
      },
      testnet: {
        address: '0xc3512594F9a7Ad8f2E1e7AE3804Eff84607785CD',
        abi: tokenMintableNonFreezableAbi,
      },
    },
    tokenNonMintableFreezable: {
      mainnet: {
        address: '',
        abi: tokenNonMintableFreezableAbi,
      },
      testnet: {
        address: '0xC81E2dC3C79805e05C0bC8140F0f6a915e3bb9A6',
        abi: tokenNonMintableFreezableAbi,
      },
    },
    tokenNonMintableNonFreezable: {
      mainnet: {
        address: '',
        abi: tokenNonMintableNonFreezableAbi,
      },
      testnet: {
        address: '0x25649F2373B8bCB055Fe59763240D9912EC9a61e',
        abi: tokenNonMintableNonFreezableAbi,
      },
    },
    lostKeyFactory: {
      mainnet: {
        address: '',
        abi: lostKeyFactoryAbi,
      },
      testnet: {
        address: '0xc48d25f459f186702bCf02ed63e731Be2C12A630',
        abi: lostKeyFactoryAbi,
      },
    },
    lastWillFactory: {
      mainnet: {
        address: '',
        abi: lastWillFactoryAbi,
      },
      testnet: {
        address: '0x91D8b4a77799e22b462a7c1316C3eeb706576209',
        abi: lastWillFactoryAbi,
      },
    },

    crowdsaleSoftCappableBonusable: {
      mainnet: {
        address: '',
        abi: crowdsaleSoftCappableBonusableAbi,
      },
      testnet: {
        address: '0x44C84450bAb67a6271Edba1bB1CA39b401206183',
        abi: crowdsaleSoftCappableBonusableAbi,
      },
    },
    crowdsaleSoftCappableNonBonusable: {
      mainnet: {
        address: '',
        abi: crowdsaleSoftCappableNonBonusableAbi,
      },
      testnet: {
        address: '0xD6Aa8E51C98b8e6880fa0F61FF1b0739461C635B',
        abi: crowdsaleSoftCappableNonBonusableAbi,
      },
    },
    crowdsaleNonSoftCappableBonusable: {
      mainnet: {
        address: '',
        abi: crowdsaleNonSoftCappableBonusableAbi,
      },
      testnet: {
        address: '0x9fbCF14999e58DdeC5824C9F3148683E89Ef7347',
        abi: crowdsaleNonSoftCappableBonusableAbi,
      },
    },
    crowdsaleNonSoftCappableNonBonusable: {
      mainnet: {
        address: '',
        abi: crowdsaleNonSoftCappableNonBonusableAbi,
      },
      testnet: {
        address: '0x5D6A133E65A70f436b2E01147722007171C83D9B',
        abi: crowdsaleNonSoftCappableNonBonusableAbi,
      },
    },
    weddingFactory: {
      mainnet: {
        address: '',
        abi: weddingFactoryAbi,
      },
      testnet: {
        address: '0xFcb123A7c2F22f7e605889Fa68bd1d5F40eD59E1',
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
