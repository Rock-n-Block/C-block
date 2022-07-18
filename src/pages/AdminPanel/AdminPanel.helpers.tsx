import { GridProps } from '@material-ui/core';
import Web3 from 'web3';

import { ContractFormsState } from 'types';
import { FactoryContracts } from 'types/utils/contractsHelper';
import { contractsHelper, decamelize } from 'utils';

export const contractsMock = ['Tokens', 'Crowdsales', 'Lost Key', 'Last Will', 'Wedding'] as const;
export const tabs = ['Users', ...contractsMock] as const;
export type AdminTabs = 'Users' | FactoryContracts;

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

export function createData(
  person: {
    name: string;
    avatarUrl: string;
  },
  email: string,
  walletAddress: string,
  isFrozen: boolean,
  permissions: {
    canViewUsers: boolean;
    canFreezeUsers: boolean;
    canContactUsers: boolean;
  },
) {
  return {
    person,
    email,
    walletAddress,
    isFrozen,
    permissions,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

export const rows = [
  createData({
    name: 'Edward',
    avatarUrl: 'http://placekitten.com/300/300',
  }, 'user1@mail.com', new Web3().eth.accounts.create().address, false, {
    canContactUsers: true,
    canFreezeUsers: false,
    canViewUsers: false,
  }),
  createData({
    name: 'Edward',
    avatarUrl: 'http://placekitten.com/300/300',
  }, 'user2@mail.com', new Web3().eth.accounts.create().address, false, {
    canContactUsers: false,
    canFreezeUsers: false,
    canViewUsers: false,
  }),
  createData({
    name: 'Edward',
    avatarUrl: 'http://placekitten.com/300/300',
  }, 'user3@mail.com', new Web3().eth.accounts.create().address, false, {
    canContactUsers: true,
    canFreezeUsers: true,
    canViewUsers: true,
  }),
  createData({
    name: 'Edward',
    avatarUrl: 'http://placekitten.com/300/300',
  }, 'user4@mail.com', new Web3().eth.accounts.create().address, false, {
    canContactUsers: true,
    canFreezeUsers: false,
    canViewUsers: true,
  }),
  createData({
    name: 'Edward',
    avatarUrl: 'http://placekitten.com/300/300',
  }, 'user5@mail.com', new Web3().eth.accounts.create().address, false, {
    canContactUsers: true,
    canFreezeUsers: true,
    canViewUsers: false,
  }),
];

export const head: { name: string; props: GridProps }[] = [{
  name: 'Name',
  props: {
    xs: 2,
  },
}, {
  name: 'E-mail',
  props: {
    xs: 2,
  },
}, {
  name: 'Wallet address',
  props: {
    xs: 4,
  },
}, {
  name: 'Action',
  props: {
    xs: 4,
  },
}];
