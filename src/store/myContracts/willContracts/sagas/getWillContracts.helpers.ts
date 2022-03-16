import {
  IGetContractsWillContractWithContractCreationField,
  IGetContractsWillContractWithSpecificField,
} from 'pages/MyContracts/MyContracts.helpers';
import { ISpecificLostKeyContractData } from 'types';

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
