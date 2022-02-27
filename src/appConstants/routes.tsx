import React from 'react';
import {
  ContractToken, WeddingRingIcon, CrowdsaleIcon, KeyIcon, WillContract,
} from 'theme/icons';

const CREATE_CONTRACT = 'create-contract';
export const TOKEN_CONTRACT = 'token-contract';
export const CROWDSALE_CONTRACT = 'crowdsale-contract';
const PREVIEW_CONTRACT = 'preview-contract';
export const WEDDING_CONTRACT = 'wedding-contract';
export const LOSTKEY_CONTRACT = 'lostkey-contract';
export const WILL_CONTRACT = 'will-contract';
const MY_CONTRACTS = 'my-contracts';
const CUSTOM_DEVELOPMENT = 'custom-development';
const EARN_PATH = 'earn';

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

const willContractRoute = {
  root: `/${CREATE_CONTRACT}/${WILL_CONTRACT}`,
  title: 'Will Contract',
  icon: <WillContract />,
  [PREVIEW_CONTRACT]: {
    root: `/${CREATE_CONTRACT}/${WILL_CONTRACT}/${PREVIEW_CONTRACT}`,
    title: 'Preview Contract',
  },
};

const myContractsRoute = {
  root: `/${MY_CONTRACTS}`,
  title: 'My contracts',
  icon: null,
};

const earnRoute = {
  root: `/${EARN_PATH}`,
  title: 'Earn',
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
  [WILL_CONTRACT]: willContractRoute,
  [MY_CONTRACTS]: myContractsRoute,
  [EARN_PATH]: earnRoute,
  [CUSTOM_DEVELOPMENT]: customDevelopmentRoute,
};
