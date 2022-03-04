import Web3 from 'web3';

import { weddingAbi } from 'config/abi';
import { IFetchWeddingContractReturnType } from 'pages/MyContracts/hooks';
import {
  IGetContractsWeddingContractWithContractCreationField, IGetContractsWeddingContractWithSpecificField,
} from 'pages/MyContracts/MyContracts.helpers';

export const getWeddingContract = (provider: Web3, contractAddress: string) => {
  const contract = new provider.eth.Contract(weddingAbi, contractAddress);
  return contract;
};

export const transformMergeWeddingContractsAndSpecificData = (
  weddings: IGetContractsWeddingContractWithContractCreationField[],
  weddingsSpecificData: IFetchWeddingContractReturnType[],
) => weddings.map((wedding, index) => {
  const specificData = weddingsSpecificData[index];
  return {
    ...wedding,
    specificContractData: {
      ...specificData,
    },
  };
}) as IGetContractsWeddingContractWithSpecificField[];
