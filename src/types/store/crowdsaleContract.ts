import { ContractAdditionalField } from '.';

export interface ICrowdsaleContractDynamicForm {
  address: string;
  rate: string;
}

export interface ICrowdsaleContract extends ContractAdditionalField {
  contractName: string;
  tokenAddress: string;
  crowdsaleOwner: string;
  softcapTokens: string;
  saleDuration: string;
  changingDates: boolean;

  minMaxInvestmentsSection: boolean;
  minInvestments: string;
  maxInvestments: string;

  amountBonusSection: boolean;
  amountBonus: string;
  minimumContribution: string;

  tokens: ICrowdsaleContractDynamicForm[];
}
