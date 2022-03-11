import Web3 from 'web3';

import { lostKeyAbi } from 'config/abi';
import {
  IGetContractsLostKeyContractWithContractCreationField, IGetContractsLostKeyContractWithSpecificField,
} from 'pages/MyContracts/MyContracts.helpers';
import { ISpecificLostKeyContractData } from 'types';

export const getLostKeyContract = (provider: Web3, contractAddress: string) => {
  const contract = new provider.eth.Contract(lostKeyAbi, contractAddress);
  return contract;
};

export const transformMergeLostKeyContractsAndSpecificData = (
  lostkeys: IGetContractsLostKeyContractWithContractCreationField[],
  lostkeysSpecificData: ISpecificLostKeyContractData[],
) => lostkeys.map((lostkey, index) => {
  const specificData = lostkeysSpecificData[index];
  return {
    ...lostkey,
    specificContractData: {
      ...specificData,
    },
  };
}) as IGetContractsLostKeyContractWithSpecificField[];
