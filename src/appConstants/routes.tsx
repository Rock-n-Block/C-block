import React from 'react';
import {
  ContractToken, WeddingRingIcon, CrowdsaleIcon, KeyIcon,
} from 'theme/icons';

const CREATE_CONTRACT = 'create-contract';
const TOKEN_CONTRACT = 'token-contract';
const CROWDSALE_CONTRACT = 'crowdsale-contract';
const PREVIEW_CONTRACT = 'preview-contract';
const WEDDING_CONTRACT = 'wedding-contract';
const LOSTKEY_CONTRACT = 'lostkey-contract';
const MY_CONTRACTS = 'my-contracts';
const CUSTOM_DEVELOPMENT = 'custom-development';

const tokenContractRoute = {
  root: `/${CREATE_CONTRACT}/${TOKEN_CONTRACT}`,
  title: 'Token Contract',
  icon: <ContractToken />,
  [PREVIEW_CONTRACT]: {
    root: `/${CREATE_CONTRACT}/${TOKEN_CONTRACT}/${PREVIEW_CONTRACT}`,
    title: 'Preview Contract',
  },
};

const crowdsaleContractRoute = {
  root: `/${CREATE_CONTRACT}/${CROWDSALE_CONTRACT}`,
  title: 'Crowdsale Contract',
  icon: <CrowdsaleIcon />,
  [PREVIEW_CONTRACT]: {
    root: `/${CREATE_CONTRACT}/${CROWDSALE_CONTRACT}/${PREVIEW_CONTRACT}`,
    title: 'Preview Contract',
  },
};

const weddingContractRoute = {
  root: `/${CREATE_CONTRACT}/${WEDDING_CONTRACT}`,
  title: 'Wedding Contract',
  icon: <WeddingRingIcon />,
  [PREVIEW_CONTRACT]: {
    root: `/${CREATE_CONTRACT}/${WEDDING_CONTRACT}/${PREVIEW_CONTRACT}`,
    title: 'Preview Contract',
  },
};

const lostKeyContractRoute = {
  root: `/${CREATE_CONTRACT}/${LOSTKEY_CONTRACT}`,
  title: 'Lost Key Contract',
  icon: <KeyIcon />,
  [PREVIEW_CONTRACT]: {
    root: `/${CREATE_CONTRACT}/${LOSTKEY_CONTRACT}/${PREVIEW_CONTRACT}`,
    title: 'Preview Contract',
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
  [WEDDING_CONTRACT]: weddingContractRoute,
  [LOSTKEY_CONTRACT]: lostKeyContractRoute,
  [MY_CONTRACTS]: myContractsRoute,
  [CUSTOM_DEVELOPMENT]: customDevelopmentRoute,
};
