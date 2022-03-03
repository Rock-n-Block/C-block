import { ContractAdditionalField } from './contractForms.shared';

export type IWeddingContract = {
  contractName: string;
  partnerOneAddress: string;
  partnerTwoAddress: string;
  partnerOneEmail: string;
  partnerTwoEmail: string;
  daysForDivorceApproval: string;
  partnerOneSliderValue: number;
  partnerTwoSliderValue: number;
  daysForWithdrawalApproval: string;
} & ContractAdditionalField;

export interface IWeddingContractActiveWithdrawalProposal {
  amount: string;
  proposedBy: string;
  receiver: string;
  timestamp: string;
  token: string;
}

export interface ISpecificWeddingContractData {
  activeWithdrawalProposal: IWeddingContractActiveWithdrawalProposal;
  // divorceDisputed: string;
  divorceProposedBy: string;
  divorceTimestamp: string;
  withdrawalProposalPending: boolean;
}
