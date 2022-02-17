import type {
  ContractFormsState, ICrowdsaleContract, ILostKeyContract, IWillContract, State, TokenContract,
} from 'types';

export default {
  getContractForms: (state: State): ContractFormsState => state.contractForms,

  getTokenContract: (state: State): TokenContract => state.contractForms.tokenContract,
  getLostKeyContract: (state: State): ILostKeyContract => state.contractForms.lostKeyContract,
  getWillContract: (state: State): IWillContract => state.contractForms.willContract,
  getCrowdsaleContract: (state: State): ICrowdsaleContract => state.contractForms.crowdsaleContract,
};
