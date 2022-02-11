import { INoNameContract } from '@amfi/connect-wallet/dist/interface';
import { contracts } from 'config';
import { ContractsNames } from 'types';

export const contractsHelper = {
  getContractData(contractName: ContractsNames, isMainnet: boolean): INoNameContract {
    return contracts.params[contractName][isMainnet ? 'mainnet' : 'testnet'];
  },
  getTokenFactoryContractName(futureMinting: boolean, freezable: boolean) {
    return [
      'token',
      futureMinting ? '' : 'Non',
      'Mintable',
      freezable ? '' : 'Non',
      'Freezable',
    ].join('');
  },
  getTokenFactoryContractMethodName(
    burnable: boolean,
    futureMinting: boolean,
    freezable: boolean,
  ) {
    return [
      'deployERC20',
      burnable ? 'Burnable' : '',
      futureMinting ? 'Mintable' : '',
      'Pausable',
      freezable ? 'Freezable' : '',
      'Token',
    ].join('');
  },
};
