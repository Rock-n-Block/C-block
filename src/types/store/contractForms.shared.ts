import { Tokens } from 'types/utils/contractsHelper';

export type MinCreationPriceField = {
  cusd: string;
  celo: string;
};

export type ContractAdditionalField = {
  additional: {
    contractCreationPrice: string;
    allVariantsCreationPrices: string[][];
    minCreationPrice: MinCreationPriceField;
    selectedBuyToken: Tokens;
  };
};
