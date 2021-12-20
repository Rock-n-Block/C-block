import React from 'react';
import { ContractToken, WeddingRingIcon } from 'theme/icons';

export const routes = {
  root: '/create-contract',
  title: 'Create Contract',
  icon: null,
  'token-contract': {
    root: '/create-contract/token-contract',
    title: 'Token Contract',
    icon: <ContractToken />,
    'preview-contract': {
      root: '/create-contract/token-contract/preview-contract',
      title: 'Preview contract',
    },
  },
  'wedding-contract': {
    root: '/create-contract/wedding-contract',
    title: 'Wedding Contract',
    icon: <WeddingRingIcon />,
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
