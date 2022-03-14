import { INoNameContract } from '@amfi/connect-wallet/dist/interface';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import {
  crowdsaleNonSoftCappableBonusableAbi,
  crowdsaleNonSoftCappableNonBonusableAbi,
  crowdsaleSoftCappableBonusableAbi,
  crowdsaleSoftCappableNonBonusableAbi,
  lostKeyFactoryAbi,
  tokenMintableFreezableAbi,
  tokenMintableNonFreezableAbi,
  tokenNonMintableFreezableAbi,
  tokenNonMintableNonFreezableAbi,
  weddingFactoryAbi,
} from 'config/abi';
import { ContractsNames } from 'types';
import { TDeployCrowdsaleContractCreationMethodNames, TDeployTokenContractCreationMethodNames } from 'types/utils/contractsHelper';
import { getCeloConfigMetamask, contracts } from 'config';

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
  [key in string]: string
};

interface ISignatureMap {
  abi: AbiItem,
  signature: string,
}

type IMethodNameSignatureMap = {
  [key in string]: ISignatureMap
};

export const contractsHelper = {
  getChainNativeCurrency(
    isMainnet: boolean,
  ) {
    return getCeloConfigMetamask(isMainnet)[0].nativeCurrency;
  },
  getContractData(
    contractName: ContractsNames,
    isMainnet: boolean,
  ): INoNameContract {
    return contracts.params[contractName][isMainnet ? 'mainnet' : 'testnet'];
  },
  getTokenFactoryContractName(futureMinting: boolean, freezable: boolean) {
    return [
      'token',
      futureMinting ? '' : ContractFactorySettings.Non,
      TokenContractFactorySettings.Mintable,
      freezable ? '' : ContractFactorySettings.Non,
      TokenContractFactorySettings.Freezable,
    ].join('');
  },
  getTokenFactoryContractMethodName(
    burnable: boolean,
    futureMinting: boolean,
    freezable: boolean,
  ) {
    return [
      'deployERC20',
      burnable ? TokenContractFactorySettings.Burnable : '',
      futureMinting ? TokenContractFactorySettings.Mintable : '',
      TokenContractFactorySettings.Pausable,
      freezable ? TokenContractFactorySettings.Freezable : '',
      'Token',
    ].join('') as TDeployTokenContractCreationMethodNames;
  },

  /**
   * Reversed `getTokenFactoryContractMethodName`, to retrieve token params burnable, mintable...
   */
  getTokenFactoryCreationParamsByDeployMethodName(
    deployMethodName: TDeployTokenContractCreationMethodNames,
  ) {
    const isBurnable = deployMethodName.includes(TokenContractFactorySettings.Burnable);
    const isMintable = deployMethodName.includes(TokenContractFactorySettings.Mintable);
    const isFreezable = deployMethodName.includes(TokenContractFactorySettings.Freezable);
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
  getCrowdsaleFactoryContractMethodName(
    isSoftcappable: boolean,
    isBonusable: boolean,
    isDatesChangeable: boolean,
  ) {
    return [
      'deploy',
      isSoftcappable ? '' : ContractFactorySettings.Non,
      CrowdsaleContractFactorySettings.SoftCappable,
      isBonusable ? CrowdsaleContractFactorySettings.Bonusable : '',
      isDatesChangeable ? CrowdsaleContractFactorySettings.DatesChangeable : '',
      'Crowdsale',
    ].join('') as TDeployCrowdsaleContractCreationMethodNames;
  },

  /**
   * Reversed `getCrowdsaleFactoryContractMethodName`, to retrieve contract params isSoftcappable...
   */
  getCrowdsaleFactoryCreationParamsByDeployMethodName(
    deployMethodName: TDeployCrowdsaleContractCreationMethodNames,
  ) {
    const isSoftcappable = !deployMethodName.includes(
      ContractFactorySettings.Non + CrowdsaleContractFactorySettings.SoftCappable,
    );
    const isBonusable = deployMethodName.includes(CrowdsaleContractFactorySettings.Bonusable);
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
};
