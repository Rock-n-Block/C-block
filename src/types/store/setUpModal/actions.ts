import { TContractAddress, TProvider } from '../actions';
import { ISetUpModalTokenAddressField } from './storeTypes';

export type TUpdateAllowanceAction = TProvider & TContractAddress & {
  tokenAddressField: ISetUpModalTokenAddressField;
};

export type TSetUpModalApproveAction = TProvider & TContractAddress & {
  tokenAddressField: ISetUpModalTokenAddressField;
};

export type TGetSetUpModalTokenAddressesAction = TProvider & TContractAddress;
export type TSetUpModalAddTokensAction = TProvider & TContractAddress & {
  tokensAddresses: string[];
};
