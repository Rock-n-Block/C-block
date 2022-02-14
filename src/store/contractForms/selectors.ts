import type {
  ContractFormsState, ILostKeyContract, IWillContract, State, TokenContract,
} from 'types';

export default {
  getContractForms: (state: State): ContractFormsState => state.contractForms,
  getTokenContract: (state: State): TokenContract => state.contractForms.tokenContract,
  getLostKeyContract: (state: State): ILostKeyContract => state.contractForms.lostKeyContract,
  getWillContract: (state: State): IWillContract => state.contractForms.willContract,
};
