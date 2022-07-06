export type ContractAdditionalField = {
  additional: {
    contractCreationPrice: string;
    allVariantsCreationPrices: string[][];
    minCreationPrice: {
      cusd: string;
      celo: string;
    };
  };
};
