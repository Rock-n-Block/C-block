import { ContractFormsState } from 'types';
import { FactoryContracts } from 'types/utils/contractsHelper';
import { contractsHelper, decamelize } from 'utils';

export const contractsMock = ['Tokens', 'Crowdsales', 'Lost Key', 'Last Will', 'Wedding'] as const;

const getContractsCreationPrices = (
  contractType: FactoryContracts, contractForms: ContractFormsState,
) => {
  if (contractType === 'Tokens') {
    return contractForms.tokenContract.additional.allVariantsCreationPrices;
  }
  if (contractType === 'Crowdsales') {
    return contractForms.crowdsaleContract.additional.allVariantsCreationPrices;
  }
  if (contractType === 'Last Will') {
    return contractForms.willContract.additional.allVariantsCreationPrices;
  }
  if (contractType === 'Lost Key') {
    return contractForms.lostKeyContract.additional.allVariantsCreationPrices;
  }
  return contractForms.weddingContract.additional.allVariantsCreationPrices;
};

export const getContracts = (contractType: FactoryContracts, contractForms: ContractFormsState) => {
  // get factory contract method name as UNIFIED ID/KEY to retrieve data from store etc.
  // @example 'deployERC20TokenBlaBla'
  const factoryContractMethodNames = contractsHelper.getFactoryContractMethodName(contractType);
  const prices = getContractsCreationPrices(contractType, contractForms);
  return factoryContractMethodNames.map((contractDeployName, index) => ({
    contractDeployName,
    contractDisplayName: decamelize(contractDeployName).replace('deploy ', ''),
    price: prices[index],
  }));
};
