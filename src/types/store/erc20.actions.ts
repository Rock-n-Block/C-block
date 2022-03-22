import { TProvider } from './actions';

export type TApproveAction = TProvider & {
  spender: string;
  tokenAddress: string;
  amount: string | number;
};
export type TGetErc20SymbolAction = TProvider & {
  tokenAddress: string;
};
