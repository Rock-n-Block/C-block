import { IFetchWeddingContractReturnType } from 'pages/MyContracts/hooks';
import {
  IGetContractsWeddingContractWithContractCreationField, IGetContractsWeddingContractWithSpecificField,
} from 'pages/MyContracts/MyContracts.helpers';

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
