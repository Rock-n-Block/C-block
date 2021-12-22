export interface ILostKeyContractDynamicForm {
  address: string;
  email: string;
  percents: string;
}

export interface ILostKeyContract {
  contractName: string;
  managementAddress: string;
  // crowdsaleOwner: string;
  // softcapTokens: string;
  // saleDuration: string;
  // changingDates: boolean;

  // minMaxInvestmentsSection: boolean;
  // minInvestments: string;
  // maxInvestments: string;

  // amountBonusSection: boolean;
  // amountBonus: string;
  // minimumContribution: string;

  reservesConfigs: ILostKeyContractDynamicForm[];
}
