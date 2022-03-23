import {
  IGetContractsWeddingContractWithContractCreationField, IGetContractsWeddingContractWithSpecificField,
} from 'pages/MyContracts/MyContracts.helpers';
import { ISpecificWeddingContractData } from 'types';

export interface IFetchWeddingContractReturnType extends ISpecificWeddingContractData {}

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
