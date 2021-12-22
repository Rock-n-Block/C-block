import {
  WillContract,
} from 'theme/icons';
import React from 'react';
import { routes } from 'appConstants';

export const createContractHelpers = [
  {
    title: routes['token-contract'].title,
    text: 'Create a Token and distribute it yourself or by our Crowdsale Contract',
    icon: routes['token-contract'].icon,
    link: routes['token-contract'].root,
  },
  {
    title: routes['crowdsale-contract'].title,
    text: 'Start your ICO/Token sale with a few clicks',
    icon: routes['crowdsale-contract'].icon,
    link: routes['crowdsale-contract'].root,
  },
  {
    title: 'Lost Key',
    text: 'The Lost Key smart contract ensures your (ERC-20 standard) tokens and redirects them to backup wallets, if you lost the access/private key or in case of a long inactivity period of time (death, accidents, etc..).',
    icon: routes['lostkey-contract'].icon,
    link: routes['lostkey-contract'].root,
  },
  {
    title: 'Will Contract ',
    text: 'Setup the transfer of funds to family or friends, in case of long inactive period of time (death, accidents & so on).',
    icon: <WillContract />,
    link: '/',
  },
  {
    title: 'Wedding Contract',
    text: 'Wallet with Multisig function distribution of funds between the owners after/during specified period of time.',
    icon: routes['wedding-contract'].icon,
    link: routes['wedding-contract'].root,
  },
];
