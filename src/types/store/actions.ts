import Web3 from 'web3';

import { IGetFundsModalTokenAddressField } from 'components/GetFundsModal/GetFundsModal.helpers';
import { IconType } from 'components/Preview/Preview.helpers';

export type TProvider = { provider: Web3 };

export type TGetContractCreationPrice = TProvider & {
  contractType: IconType;
};
export type TCreateTokenContractAction = TProvider;
export type TCreateLostKeyContractAction = TProvider;
export type TCreateWillContractAction = TProvider;
export type TCreateCrowdsaleContractAction = TProvider;
export type TCreateWeddingContractAction = TProvider;

export type TGetCrowdsaleContractAdditionalDataAction = TProvider;
export type TGetContractsMinCreationPrice = TProvider;

export type TContractAddress = { contractAddress: string };

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

// Earn Slice
export type TGetFinishedContractsAction = TProvider;
export type TTransferRewardAction = TProvider & TContractAddress;

// Rates Slice
export type TGetRatesAction = TProvider;
