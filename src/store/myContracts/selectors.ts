import { IContractsCard } from 'pages/MyContracts/MyContracts.helpers';
import type { State } from 'types';

export default {
  getMyContracts: (state: State): IContractsCard[] => state.myContracts.contracts,
};
