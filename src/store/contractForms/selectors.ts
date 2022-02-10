import type { ContractFormsState, ILostKeyContract, State } from 'types';

export default {
  getContractForms: (state: State): ContractFormsState => state.contractForms,
  getLostKeyContract: (state: State): ILostKeyContract => state.contractForms.lostKeyContract,
};
