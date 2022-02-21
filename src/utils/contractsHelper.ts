import { INoNameContract } from '@amfi/connect-wallet/dist/interface';
import { contracts } from 'config/config';
import { ContractsNames } from 'types';

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

export const contractsHelper = {
  getContractData(contractName: ContractsNames, isMainnet: boolean): INoNameContract {
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
    ].join('');
  },

  getCrowdsaleFactoryContractName(isSoftcappable: boolean, isBonusable: boolean) {
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
    ].join('');
  },
};
