import { TProvider } from '../actions';
import { ISetUpModalTokenAddressField } from './storeTypes';

export type TUpdateAllowanceAction = TProvider & {
  contractAddress: string;
  tokenAddressField: ISetUpModalTokenAddressField;
};

export type TSetUpModalApproveAction = TProvider & {
  contractAddress: string;
  tokenAddressField: ISetUpModalTokenAddressField;
};
