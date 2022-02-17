/* eslint-disable newline-per-chained-call */
import React, { ReactElement } from 'react';
import * as Yup from 'yup';

import { Snowflake } from 'theme/icons';
import { ethereumAddressSchema, latinAndNumbers, latinAndNumbersWithOrNotSeparatedBySpaceRegExp } from 'utils';

const yesterday = new Date(Date.now() - 86400000);
// because of safari
const maxDate = new Date('9999-12-12'.replace(/-/g, '/'));

export const validationSchema = Yup.object().shape({
  tokenName: Yup.string().matches(latinAndNumbers).min(5).max(25).required(),
  tokenOwner: ethereumAddressSchema.required(),
  tokenSymbol: Yup.string().matches(latinAndNumbers).min(3).max(4).required(),
  decimals: Yup.number().positive().min(0).max(18).required(),
  futureMinting: Yup.boolean().required(),
  burnable: Yup.boolean().required(),
  freezable: Yup.boolean().required(),
  tokens: Yup.array().of(
    Yup.object().shape({
      address: ethereumAddressSchema.required(),
      name: Yup.string().matches(latinAndNumbersWithOrNotSeparatedBySpaceRegExp).max(25).required(),
      amount: Yup.number().positive().required(),
      isFrozen: Yup.boolean().when('freezable', {
        is: true,
        then: Yup.boolean().required(),
      }),
      frozenUntilDate: Yup.date().when('isFrozen', {
        is: true,
        then: Yup.date().min(yesterday).max(maxDate).required(),
      }),
    }),
  ),
});

type TokenContractFieldType = {
  id: string,
  name: string,
  icon?: ReactElement,
  renderProps: {
    label: string;
    name: string;
  } & Record<string, string>,
  helperText?: string[],
  isShort?: boolean,
};

type TokenContractFormConfig = TokenContractFieldType[][];

export const tokenContractFormConfigStart: TokenContractFormConfig = [
  [
    {
      id: 'tokenName',
      name: 'tokenName',
      renderProps: {
        label: 'Token Name',
        name: 'tokenName',
      },
      helperText: ['Enter name of the project without spaces, usually 5-25 symbols. Lower and uppercase can be used'],
    },
  ],
  [
    {
      id: 'tokenOwner',
      name: 'tokenOwner',
      renderProps: {
        label: 'Token Owner',
        name: 'tokenOwner',
      },
      helperText: ['Celo address (not exchange address). This address will be owner of the token (after sale end date). Double check the address (and access to it) before submission'],
    },
    {
      id: 'tokenSymbol',
      name: 'tokenSymbol',
      renderProps: {
        label: 'Token Symbol',
        name: 'tokenSymbol',
      },
      helperText: ['Usually 3-4 Letters like ETH, BTC, NEO3, WISH etc.. Please check that it’s unique before submission'],
    },
    {
      id: 'decimals',
      name: 'decimals',
      renderProps: {
        label: 'Decimals',
        name: 'decimals',
      },
      isShort: true,
      helperText: ['Defines the number of decimals for the token. 0-18 numerals are accepted. 18 as common practice'],
    },
  ],
];

export const dynamicFormDataConfig: TokenContractFieldType[] = [
  {
    id: 'address',
    name: 'address',
    renderProps: {
      label: 'Address',
      name: 'address',
      type: 'input',
    },
  },
  {
    id: 'name',
    name: 'name',
    renderProps: {
      label: 'Wallet name',
      name: 'name',
      type: 'input',
    },
  },
  {
    id: 'amount',
    name: 'amount',
    renderProps: {
      label: 'Token amount',
      name: 'amount',
      type: 'input',
    },
  },
  {
    id: 'isFrozen',
    name: 'isFrozen',
    icon: <Snowflake />,
    renderProps: {
      label: 'Frozen until date',
      name: 'isFrozen',
      type: 'switch',
    },
  },
  {
    id: 'frozenUntilDate',
    name: 'frozenUntilDate',
    isShort: true,
    renderProps: {
      label: '',
      name: 'frozenUntilDate',
      type: 'date',
    },
  },
];

export const tokenContractFormConfigEnd: TokenContractFieldType[] = [
  {
    id: 'futureMinting',
    name: 'futureMinting',
    renderProps: {
      label: 'Future minting',
      name: 'futureMinting',
      type: 'switch',
    },
    helperText: ['Yes - you can create more tokens in the future & use token for Crowdsale.', 'No - no more tokens will be created in the future. Crowdsale is impossible.'],
  },
  {
    id: 'burnable',
    name: 'burnable',
    renderProps: {
      label: 'Burnable',
      name: 'burnable',
      type: 'switch',
    },
    helperText: ['Yes - you can permanently remove token from circulation and reduce the supply.'],
  },
  {
    id: 'freezable',
    name: 'freezable',
    renderProps: {
      label: 'Freezable',
      name: 'freezable',
      type: 'switch',
    },
    helperText: ['Yes - you can freeze transfers of the specified users.', 'No - you can`t freeze.'],
  },
];
