import { IContractsCard, isFoundContract } from 'pages/MyContracts/MyContracts.helpers';
import type {
  ISpecificLostKeyContractData,
  ISpecificWillContractData,
  State,
} from 'types';

const getMyContracts = (state: State): IContractsCard[] => state.myContracts.contracts;

export default {
  getMyContracts,

  // setUpModalSelectors
  getSetUpModalAddresses: (contractAddress: string) => (state: State) => {
    const myContracts = getMyContracts(state);
    const contract = myContracts.find((card) => isFoundContract(card, contractAddress));
    if (!contract) return [];
    return (contract.specificContractData as ISpecificLostKeyContractData | ISpecificWillContractData).addresses;
  },
};
