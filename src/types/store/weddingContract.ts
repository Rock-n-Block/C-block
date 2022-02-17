import { ContractAdditionalField } from '.';

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
