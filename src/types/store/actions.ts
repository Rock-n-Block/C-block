// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TProvider = { provider: any };

export type TApproveAction = TProvider & {
  spender: string;
  tokenAddress: string;
  amount: string | number;
};
export type TCreateTokenContractAction = TProvider;
export type TCreateLostKeyContractAction = TProvider;
export type TCreateWillContractAction = TProvider;
