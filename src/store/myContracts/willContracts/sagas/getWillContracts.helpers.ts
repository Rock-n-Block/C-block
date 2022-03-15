import Web3 from 'web3';

import { lostKeyAbi } from 'config/abi';
import {
  IGetContractsWillContractWithContractCreationField,
  IGetContractsWillContractWithSpecificField,
} from 'pages/MyContracts/MyContracts.helpers';
import { ISpecificLostKeyContractData } from 'types';

export const getWillContract = (provider: Web3, contractAddress: string) => {
  const contract = new provider.eth.Contract(lostKeyAbi, contractAddress);
  return contract;
};

export const transformMergeWillContractsAndSpecificData = (
  lastwills: IGetContractsWillContractWithContractCreationField[],
  lastwillsSpecificData: ISpecificLostKeyContractData[],
) => lastwills.map((will, index) => {
  const specificData = lastwillsSpecificData[index];
  return {
    ...will,
    specificContractData: {
      ...specificData,
    },
  };
}) as IGetContractsWillContractWithSpecificField[];
