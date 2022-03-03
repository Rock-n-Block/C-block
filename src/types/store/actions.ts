import { IGetFundsModalTokenAddressField } from 'components/GetFundsModal/GetFundsModal.helpers';
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
export type TCreateWeddingContractAction = TProvider;

export type TGetCrowdsaleContractAdditionalDataAction = TProvider;

export type TGetErc20SymbolAction = TProvider & {
  tokenAddress: string;
};

type TContractAddress = { contractAddress: string };

// My Contracts Slice
export type TGetMyContractsAction = TProvider;

// My Contracts/Wedding
type TBaseWeddingAction = TProvider & TContractAddress;
export type TInitWithdrawalAction = TBaseWeddingAction & {
  tokenAddress: string,
  addressToSend: string,
  amount: string,
};
export type TApproveWithdrawalAction = TBaseWeddingAction;
export type TRejectWithdrawalAction = TBaseWeddingAction;

export type TInitDivorceAction = TBaseWeddingAction;
export type TApproveDivorceAction = TBaseWeddingAction;
export type TRejectDivorceAction = TBaseWeddingAction;

export type TGetFundsAfterDivorceAction = TBaseWeddingAction & {
  tokensAddresses: IGetFundsModalTokenAddressField[];
};
