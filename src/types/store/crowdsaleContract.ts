import { Tokens } from 'types/utils/contractsHelper';
import { ContractAdditionalField } from './contractForms.shared';

export interface ICrowdsaleContractDynamicForm {
  address: string;
  rate: string;
}

interface ICrowdsaleAdditionalField extends ContractAdditionalField {
  additional: {
    contractCreationPrice: string;
    allVariantsCreationPrices: string[][];
    minCreationPrice: {
      cusd: string;
      celo: string;
    };
    selectedBuyToken: Tokens;

    tokenToSaleSymbol: string;
    paymentTokensSymbols: string[];
  }
}

export interface ICrowdsaleContract extends ICrowdsaleAdditionalField {
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
