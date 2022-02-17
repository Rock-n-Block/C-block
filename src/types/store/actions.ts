import { IconType } from 'components/Preview/Preview.helpers';
import Web3 from 'web3';

export type TProvider = { provider: Web3 };

export type TApproveAction = TProvider & {
  spender: string;
  tokenAddress: string;
  amount: string | number;
};
export type TGetContractCreationPrice = TProvider & {
  contractType: IconType;
};
export type TCreateTokenContractAction = TProvider;
export type TCreateLostKeyContractAction = TProvider;
export type TCreateWillContractAction = TProvider;
export type TCreateCrowdsaleContractAction = TProvider;

export type TGetCrowdsaleContractAdditionalDataAction = TProvider;

export type TGetErc20SymbolAction = TProvider & {
  tokenAddress: string;
};
