import { Tokens } from 'types/utils/contractsHelper';

export type ContractAdditionalField = {
  additional: {
    contractCreationPrice: string;
    allVariantsCreationPrices: string[][];
    minCreationPrice: {
      cusd: string;
      celo: string;
    };
    selectedBuyToken: Tokens;
  };
};
