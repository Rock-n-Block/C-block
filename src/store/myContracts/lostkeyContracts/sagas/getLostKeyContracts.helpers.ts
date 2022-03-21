import {
  IGetContractsLostKeyContractWithContractCreationField, IGetContractsLostKeyContractWithSpecificField,
} from 'pages/MyContracts/MyContracts.helpers';
import { ISpecificLostKeyContractData } from 'types';

export const transformMergeLostKeyContractsAndSpecificData = (
  lostkeys: IGetContractsLostKeyContractWithContractCreationField[],
  lostkeysSpecificData: ISpecificLostKeyContractData[],
) => lostkeys.map((lostkey, index) => {
  const specificData = lostkeysSpecificData[index];
  return {
    ...lostkey,
    specificContractData: {
      addresses: [],
      ...specificData,
    },
  };
}) as IGetContractsLostKeyContractWithSpecificField[];
