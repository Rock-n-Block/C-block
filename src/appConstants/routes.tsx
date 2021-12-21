import React from 'react';
import { ContractToken, WeddingRingIcon, CrowdsaleIcon } from 'theme/icons';

const CREATE_CONTRACT = '/create-contract';

export const routes = {
  root: CREATE_CONTRACT,
  title: 'Create Contract',
  icon: null,
  'token-contract': {
    root: `${CREATE_CONTRACT}/token-contract`,
    title: 'Token Contract',
    icon: <ContractToken />,
    'preview-contract': {
      root: '/create-contract/token-contract/preview-contract',
      title: 'Preview contract',
    },
  },
  'wedding-contract': {
    root: `${CREATE_CONTRACT}/wedding-contract`,
    title: 'Wedding Contract',
    icon: <WeddingRingIcon />,
    'preview-contract': {
      root: `${CREATE_CONTRACT}/wedding-contract/preview-contract`,
      title: 'Preview contract',
    },
  },
  'crowdsale-contract': {
    root: `${CREATE_CONTRACT}/crowdsale-contract`,
    title: 'Crowdsale Contract',
    icon: <CrowdsaleIcon />,
  },
  'my-contracts': {
    root: '/my-contracts',
    title: 'My contracts',
    icon: null,
  },
  'custom-development': {
    root: '/custom-development',
    title: 'Custom development',
    icon: null,
  },
};
