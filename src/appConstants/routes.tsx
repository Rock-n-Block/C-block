import React from 'react';
import { ContractToken, CrowdsaleIcon } from 'theme/icons';

const CREATE_CONTRACT = 'create-contract';
const TOKEN_CONTRACT = 'token-contract';
const CROWDSALE_CONTRACT = 'crowdsale-contract';
const PREVIEW_CONTRACT = 'preview-contract';
const MY_CONTRACTS = 'my-contracts';
const CUSTOM_DEVELOPMENT = 'custom-development';

const tokenContractRoute = {
  root: `/${CREATE_CONTRACT}/${TOKEN_CONTRACT}`,
  title: 'Token Contract',
  icon: <ContractToken />,
  [PREVIEW_CONTRACT]: {
    root: `/${CREATE_CONTRACT}/${TOKEN_CONTRACT}/${PREVIEW_CONTRACT}`,
    title: 'Preview contract',
  },
};

const crowdsaleContractRoute = {
  root: `/${CREATE_CONTRACT}/${CROWDSALE_CONTRACT}`,
  title: 'Crowdsale Contract',
  icon: <CrowdsaleIcon />,
  [PREVIEW_CONTRACT]: {
    root: `/${CREATE_CONTRACT}/${CROWDSALE_CONTRACT}/${PREVIEW_CONTRACT}`,
    title: 'Preview contract',
  },
};

const myContractsRoute = {
  root: `/${MY_CONTRACTS}`,
  title: 'My contracts',
  icon: null,
};

const customDevelopmentRoute = {
  root: `/${CUSTOM_DEVELOPMENT}`,
  title: 'Custom development',
  icon: null,
};

export const routes = {
  root: `/${CREATE_CONTRACT}`,
  title: 'Create Contract',
  icon: null,
  [TOKEN_CONTRACT]: tokenContractRoute,
  [CROWDSALE_CONTRACT]: crowdsaleContractRoute,
  [MY_CONTRACTS]: myContractsRoute,
  [CUSTOM_DEVELOPMENT]: customDevelopmentRoute,
};
