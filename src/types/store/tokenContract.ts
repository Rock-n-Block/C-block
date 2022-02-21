import { ContractAdditionalField } from './contractForms.shared';

export type TokenContractDynamicForm = {
  address: string;
  name: string;
  amount: string;
  isFrozen: boolean;
  frozenUntilDate: string;
};

export type TokenContract = {
  tokenName: string;
  tokenOwner: string;
  tokenSymbol: string;
  decimals: string;
  futureMinting: boolean;
  burnable: boolean;
  freezable: boolean;
  tokens: TokenContractDynamicForm[];
} & ContractAdditionalField;
