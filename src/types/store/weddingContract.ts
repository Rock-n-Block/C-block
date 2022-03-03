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

export interface ISpecificWeddingContractData {
  activeWithdrawalProposal: string;
  // divorceDisputed: string;
  divorceProposedBy: string;
  divorceTimestamp: string;
  withdrawalProposalPending: string;
}
