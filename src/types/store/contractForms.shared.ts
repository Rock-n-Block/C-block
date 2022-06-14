export type ContractAdditionalField = {
  additional: {
    contractCreationPrice: string;
    allVariantsCreationPrices: string[];
    minCreationPrice: {
      usd: string;
      celo: string;
    };
  };
};
