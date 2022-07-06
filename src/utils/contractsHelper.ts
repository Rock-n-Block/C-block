import { INoNameContract } from '@amfi/connect-wallet/dist/interface';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import {
  bep20Abi,
  erc20BurnableMintablePausableFreezableTokenAbi,
  crowdsaleNonSoftCappableBonusableAbi,
  crowdsaleNonSoftCappableNonBonusableAbi,
  crowdsaleSoftCappableBonusableAbi,
  crowdsaleSoftCappableNonBonusableAbi,
  lastWillFactoryAbi,
  lostKeyAbi,
  lostKeyFactoryAbi,
  tokenMintableFreezableAbi,
  tokenMintableNonFreezableAbi,
  tokenNonMintableFreezableAbi,
  tokenNonMintableNonFreezableAbi,
  weddingAbi,
  weddingFactoryAbi,
  controllerAbi,
} from 'config/abi';
import {
  FactoryContracts,
  TDeployContractCreationMethodNames,
  TDeployCrowdsaleContractCreationMethodNames,
  TDeployLostKeyContractCreationMethodNames,
  TDeployTokenContractCreationMethodNames,
  TDeployWeddingContractCreationMethodNames,
  TDeployWillContractCreationMethodNames,
  Tokens,
} from 'types/utils/contractsHelper';
import { getCeloConfigMetamask, contracts } from 'config';

import { ContractsNames } from 'types';
import { Bep20 } from 'types/abi/bep20';

import { CrowdsaleNonSoftCappableBonusable } from 'types/abi/crowdsaleNonSoftCappableBonusable';
import { CrowdsaleNonSoftCappableNonBonusable } from 'types/abi/crowdsaleNonSoftCappableNonBonusable';
import { CrowdsaleSoftCappableBonusable } from 'types/abi/crowdsaleSoftCappableBonusable';
import { CrowdsaleSoftCappableNonBonusable } from 'types/abi/crowdsaleSoftCappableNonBonusable';

import { TokenMintableFreezable } from 'types/abi/tokenMintableFreezable';
import { TokenMintableNonFreezable } from 'types/abi/tokenMintableNonFreezable';
import { TokenNonMintableFreezable } from 'types/abi/tokenNonMintableFreezable';
import { TokenNonMintableNonFreezable } from 'types/abi/tokenNonMintableNonFreezable';

import { LostKey } from 'types/abi/lostKey';
import { LostKeyFactory } from 'types/abi/lostKeyFactory';

import { Wedding } from 'types/abi/wedding';
import { WeddingFactory } from 'types/abi/weddingFactory';
import { LastWillFactory } from 'types/abi/lastWillFactory';
import { Erc20BurnableMintablePausableFreezableToken } from 'types/abi/erc20BurnableMintablePausableFreezableToken';
import { Controller } from 'types/abi/controller';

enum ContractFactorySettings {
  Non = 'Non',
}

enum TokenContractFactorySettings {
  Mintable = 'Mintable',
  Freezable = 'Freezable',
  Burnable = 'Burnable',
  Pausable = 'Pausable',
}

enum CrowdsaleContractFactorySettings {
  SoftCappable = 'SoftCappable',
  Bonusable = 'Bonusable',
  DatesChangeable = 'DatesChangeable',
}

type ISignatureMethodNameMap = {
  [key in string]: string;
};

interface ISignatureMap {
  abi: AbiItem;
  signature: string;
}

type IMethodNameSignatureMap = {
  [key in string]: ISignatureMap;
};

const contractsGetter = {
  getBep20Contract(provider: Web3, contractAddress: string) {
    return new provider.eth.Contract(
      bep20Abi,
      contractAddress,
    ) as unknown as Bep20;
  },
  getErc20BurnableMintablePausableFreezableToken(provider: Web3, contractAddress: string) {
    return new provider.eth.Contract(
      erc20BurnableMintablePausableFreezableTokenAbi,
      contractAddress,
    ) as unknown as Erc20BurnableMintablePausableFreezableToken;
  },
  getWillContract(provider: Web3, contractAddress: string) {
    return new provider.eth.Contract(
      lostKeyAbi,
      contractAddress,
    ) as unknown as LostKey;
  },
  getWillFactoryContract(provider: Web3, contractAddress: string) {
    return new provider.eth.Contract(
      lastWillFactoryAbi,
      contractAddress,
    ) as unknown as LastWillFactory;
  },
  getLostKeyContract(provider: Web3, contractAddress: string) {
    return new provider.eth.Contract(
      lostKeyAbi,
      contractAddress,
    ) as unknown as LostKey;
  },
  getLostKeyFactoryContract(provider: Web3, contractAddress: string) {
    return new provider.eth.Contract(
      lostKeyFactoryAbi,
      contractAddress,
    ) as unknown as LostKeyFactory;
  },
  getCrowdsaleFactoryContract(
    provider: Web3,
    crowdsaleFactoryAbi: AbiItem | AbiItem[],
    contractAddress: string,
  ) {
    return new provider.eth.Contract(
      crowdsaleFactoryAbi,
      contractAddress,
    ) as unknown as
      | CrowdsaleNonSoftCappableBonusable
      | CrowdsaleNonSoftCappableNonBonusable
      | CrowdsaleSoftCappableBonusable
      | CrowdsaleSoftCappableNonBonusable;
  },
  getTokenFactoryContract(
    provider: Web3,
    tokenFactoryAbi: AbiItem | AbiItem[],
    contractAddress: string,
  ) {
    return new provider.eth.Contract(
      tokenFactoryAbi,
      contractAddress,
    ) as unknown as |
    TokenMintableFreezable |
    TokenMintableNonFreezable |
    TokenNonMintableFreezable |
    TokenNonMintableNonFreezable;
  },
  getWeddingContract(provider: Web3, contractAddress: string) {
    return new provider.eth.Contract(
      weddingAbi,
      contractAddress,
    ) as unknown as Wedding;
  },
  getWeddingFactoryContract(provider: Web3, contractAddress: string) {
    return new provider.eth.Contract(
      weddingFactoryAbi,
      contractAddress,
    ) as unknown as WeddingFactory;
  },
  getControllerContract(provider: Web3, contractAddress: string) {
    return new provider.eth.Contract(
      controllerAbi,
      contractAddress,
    ) as unknown as Controller;
  },
};

const getChainNativeCurrency = (isMainnet: boolean) => getCeloConfigMetamask(isMainnet)[0].nativeCurrency;

const getTokenFactoryContractMethodName = (
  burnable: boolean,
  futureMinting: boolean,
  freezable: boolean,
) => [
  'deployERC20',
  burnable ? TokenContractFactorySettings.Burnable : '',
  futureMinting ? TokenContractFactorySettings.Mintable : '',
  TokenContractFactorySettings.Pausable,
  freezable ? TokenContractFactorySettings.Freezable : '',
  'Token',
].join('') as TDeployTokenContractCreationMethodNames;

const getCrowdsaleFactoryContractMethodName = (
  isSoftcappable: boolean,
  isBonusable: boolean,
  isDatesChangeable: boolean,
) => [
  'deploy',
  isSoftcappable ? '' : ContractFactorySettings.Non,
  CrowdsaleContractFactorySettings.SoftCappable,
  isBonusable ? CrowdsaleContractFactorySettings.Bonusable : '',
  isDatesChangeable ? CrowdsaleContractFactorySettings.DatesChangeable : '',
  'Crowdsale',
].join('') as TDeployCrowdsaleContractCreationMethodNames;

const getFactoryContractMethodName = (
  factoryName: FactoryContracts,
): TDeployContractCreationMethodNames[] => {
  if (factoryName === 'Tokens') {
    // 8 - is a count of all variations of token contracts (futureMinting, freezable, burnable)
    const allVariations = [
      [0, 0, 0],
      [0, 0, 1],
      [0, 1, 0],
      [0, 1, 1],
      [1, 0, 0],
      [1, 0, 1],
      [1, 1, 0],
      [1, 1, 1],
    ];
    // 0: "deployERC20PausableToken"
    // 1: "deployERC20BurnablePausableToken"
    // 2: "deployERC20PausableFreezableToken"
    // 3: "deployERC20BurnablePausableFreezableToken"
    // 4: "deployERC20MintablePausableToken"
    // 5: "deployERC20BurnableMintablePausableToken"
    // 6: "deployERC20MintablePausableFreezableToken"
    // 7: "deployERC20BurnableMintablePausableFreezableToken"
    return allVariations.map(
      ([futureMinting, freezable, burnable]) => getTokenFactoryContractMethodName(
        !!burnable, !!futureMinting, !!freezable,
      ),
    ) as TDeployTokenContractCreationMethodNames[];
  }

  if (factoryName === 'Crowdsales') {
    // 8 - is a count of all variations of crowdsale contracts
    // [ isSoftcappable, isBonusable, isDatesChangeable ]
    const allVariations = [
      [0, 0, 0],
      [0, 0, 1],
      [0, 1, 0],
      [0, 1, 1],
      [1, 0, 0],
      [1, 0, 1],
      [1, 1, 0],
      [1, 1, 1],
    ];

    // 0: "deployNonSoftCappableCrowdsale"
    // 1: "deployNonSoftCappableDatesChangeableCrowdsale"
    // 2: "deployNonSoftCappableBonusableCrowdsale"
    // 3: "deployNonSoftCappableBonusableDatesChangeableCrowdsale"
    // 4: "deploySoftCappableCrowdsale"
    // 5: "deploySoftCappableDatesChangeableCrowdsale"
    // 6: "deploySoftCappableBonusableCrowdsale"
    // 7: "deploySoftCappableBonusableDatesChangeableCrowdsale"
    return allVariations.map(
      ([isSoftcappable, isBonusable, isDatesChangeable]) => getCrowdsaleFactoryContractMethodName(
        !!isSoftcappable, !!isBonusable, !!isDatesChangeable,
      ),
    ) as TDeployCrowdsaleContractCreationMethodNames[];
  }

  if (factoryName === 'Last Will') {
    return ['deployLastWill'] as TDeployWillContractCreationMethodNames[];
  }

  if (factoryName === 'Lost Key') {
    return ['deployLostKey'] as TDeployLostKeyContractCreationMethodNames[];
  }

  return ['deployWedding'] as TDeployWeddingContractCreationMethodNames[];
};

export const contractsHelper = {
  ...contractsGetter,
  getChainNativeCurrency,
  getContractData(
    contractName: ContractsNames,
    isMainnet: boolean,
  ): INoNameContract {
    return contracts.params[contractName][isMainnet ? 'mainnet' : 'testnet'];
  },
  getFactoryContractMethodName,
  getTokenFactoryContractName(futureMinting: boolean, freezable: boolean) {
    return [
      'token',
      futureMinting ? '' : ContractFactorySettings.Non,
      TokenContractFactorySettings.Mintable,
      freezable ? '' : ContractFactorySettings.Non,
      TokenContractFactorySettings.Freezable,
    ].join('');
  },
  getTokenFactoryContractMethodName,

  /**
   * Reversed `getTokenFactoryContractMethodName`, to retrieve token params burnable, mintable...
   */
  getTokenFactoryCreationParamsByDeployMethodName(
    deployMethodName: TDeployTokenContractCreationMethodNames,
  ) {
    const isBurnable = deployMethodName.includes(
      TokenContractFactorySettings.Burnable,
    );
    const isMintable = deployMethodName.includes(
      TokenContractFactorySettings.Mintable,
    );
    const isFreezable = deployMethodName.includes(
      TokenContractFactorySettings.Freezable,
    );
    return {
      isBurnable,
      isMintable,
      isFreezable,
    };
  },

  getCrowdsaleFactoryContractName(
    isSoftcappable: boolean,
    isBonusable: boolean,
  ) {
    return [
      'crowdsale',
      isSoftcappable ? '' : ContractFactorySettings.Non,
      CrowdsaleContractFactorySettings.SoftCappable,
      isBonusable ? '' : ContractFactorySettings.Non,
      CrowdsaleContractFactorySettings.Bonusable,
    ].join('');
  },
  getCrowdsaleFactoryContractMethodName,

  /**
   * Reversed `getCrowdsaleFactoryContractMethodName`, to retrieve contract params isSoftcappable...
   */
  getCrowdsaleFactoryCreationParamsByDeployMethodName(
    deployMethodName: TDeployCrowdsaleContractCreationMethodNames,
  ) {
    const isSoftcappable = !deployMethodName.includes(
      ContractFactorySettings.Non +
        CrowdsaleContractFactorySettings.SoftCappable,
    );
    const isBonusable = deployMethodName.includes(
      CrowdsaleContractFactorySettings.Bonusable,
    );
    const isDatesChangeable = deployMethodName.includes(
      CrowdsaleContractFactorySettings.DatesChangeable,
    );
    return {
      isSoftcappable,
      isBonusable,
      isDatesChangeable,
    };
  },

  getDeployMethodNameSignatureMap(web3: Web3) {
    const abiInterfaces: AbiItem[] = [
      crowdsaleNonSoftCappableBonusableAbi,
      crowdsaleNonSoftCappableNonBonusableAbi,
      crowdsaleSoftCappableBonusableAbi,
      crowdsaleSoftCappableNonBonusableAbi,
      lostKeyFactoryAbi,
      lastWillFactoryAbi,
      tokenMintableFreezableAbi,
      tokenMintableNonFreezableAbi,
      tokenNonMintableFreezableAbi,
      tokenNonMintableNonFreezableAbi,
      weddingFactoryAbi,
    ].flat();
    // { '0x123213': 'deploySome()' }
    const signatureMethodNameMap = {} as ISignatureMethodNameMap;
    const methodNameSignatureMap = abiInterfaces
      .filter((abiItem) => abiItem.name?.startsWith('deploy'))
      .reduce((accumulator, abi) => {
        const { name: methodName } = abi;
        const signature = web3.eth.abi.encodeFunctionSignature(abi);
        accumulator[methodName] = { abi, signature };
        signatureMethodNameMap[signature] = methodName;
        return accumulator;
      }, {} as IMethodNameSignatureMap);
    return { methodNameSignatureMap, signatureMethodNameMap };
  },

  getTokensDecimals(tokens: Tokens, isMainnet: boolean) {
    const mapTokensToDecimals = {
      celo: getChainNativeCurrency(isMainnet).decimals,
      cusd: 18,
    };
    return mapTokensToDecimals[tokens];
  },
};
