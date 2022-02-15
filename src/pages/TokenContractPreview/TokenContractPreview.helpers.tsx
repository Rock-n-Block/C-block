import React, { ReactNode } from 'react';
import { Snowflake } from 'theme/icons';

export type TokenContractPreviewHelperType = {
  key?: string;
  label: string;
  shouldSkipObjectValue?: boolean;
  value?: string;
  icon?: ReactNode;
};

export const staticTokenContractPreviewHelpers: TokenContractPreviewHelperType[][] = [
  [
    {
      key: 'tokenName',
      label: 'Token name:',
    },
    {
      key: 'decimals',
      label: 'Decimals:',
    },
    {
      key: 'tokenSymbol',
      label: 'Token symbol:',
    },
    {
      shouldSkipObjectValue: true,
      label: 'Token type:',
      value: 'ERC20',
    },
  ],
  [
    {
      key: 'futureMinting',
      label: 'Future minting',
    },
    {
      key: 'burnable',
      label: 'Burnable:',
    },
    {
      key: 'freezable',
      label: 'Freezable:',
    },
  ],
];

export const dynamicTokenContractPreviewHelpers: TokenContractPreviewHelperType[] = [
  {
    key: 'name',
    label: 'Name:',
  },
  {
    key: 'amount',
    label: 'Amount:',
  },
  {
    key: 'frozenUntilDate',
    label: 'Frozen till:',
    icon: <Snowflake />,
  },
];
