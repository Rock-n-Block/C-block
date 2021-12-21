import React, { ReactElement } from 'react';
import { TextFieldProps } from '@material-ui/core';
import * as Yup from 'yup';
import { Calendar, DescendingSortOrderIcon } from 'theme/icons';
import { latinAndNumbers } from 'utils';

export const validationSchema = Yup.object().shape({
  contractName: Yup.string().matches(latinAndNumbers).min(5).required(),
  tokenAddress: Yup.string().length(42).required(),
  crowdsaleOwner: Yup.string().length(42).required(),

  tokens: Yup.array().of(
    Yup.object().shape({
      address: Yup.string().length(42).required(),
      rate: Yup.number().min(1).max(100000)
        .required(),
    }),
  ),

  softcapTokens: Yup.number().integer().min(0).required(),
  saleDuration: Yup.number().integer().min(1).required(),

  minMaxInvestmentsSection: Yup.boolean(),
  minInvestments: Yup
    .number()
    .lessThan(Yup.ref('maxInvestments'))
    .when('minMaxInvestmentsSection', (value, schema) => (value ? schema.required() : schema)),
  maxInvestments: Yup
    .number()
    .moreThan(Yup.ref('minInvestments'))
    .when('minMaxInvestmentsSection', (value, schema) => (value ? schema.required() : schema)),

  amountBonusSection: Yup.boolean(),
  amountBonus: Yup
    .number()
    .moreThan(Yup.ref('minimumContribution'))
    .when('amountBonusSection', (value, schema) => (value ? schema.required() : schema)),
  minimumContribution: Yup
    .number()
    .lessThan(Yup.ref('amountBonus'))
    .when('amountBonusSection', (value, schema) => (value ? schema.required() : schema)),
});

type CrowdsaleContractFieldType = {
  id: string;
  name: string;
  icon?: ReactElement;
  renderProps?: {
    label: string;
    name: string;
  } & TextFieldProps;
  helperText: string[];
  infoText?: string[];
  isShort?: boolean;
};

type CrowdsaleContractFormConfig = CrowdsaleContractFieldType[][];

interface ICrowdsaleContractFlagOption extends CrowdsaleContractFieldType {
  title: string;
}

interface ICrowdsaleContractSwitchableSection {
  id: string;
  title: string;
  description?: string;
  fields: CrowdsaleContractFieldType[];
}

export const crowdsaleContractFormConfigStart: CrowdsaleContractFormConfig = [
  [
    {
      id: 'contractName',
      name: 'contractName',
      renderProps: {
        label: 'Contract name',
        name: 'contractName',
      },
      helperText: [],
    },
  ],
  [
    {
      id: 'tokenAddress',
      name: 'tokenAddress',
      renderProps: {
        label: 'Token address',
        name: 'tokenAddress',
      },
      helperText: [
        'Please provide the address of your token that you will sell. Kindly note that deflationary tokens are supported but we don`t take responsibility for its commissions.',
      ],
    },
    {
      id: 'crowdsaleOwner',
      name: 'crowdsaleOwner',
      renderProps: {
        label: 'Crowdsale owner',
        name: 'crowdsaleOwner',
      },
      helperText: [
        'Celo address (not exchange address). This address will be owner of the crowdsale (after sale end date). Double check the address (and access to it) before submission',
      ],
    },
  ],
];

export const dynamicFormDataConfig: CrowdsaleContractFieldType[] = [
  {
    id: 'address',
    name: 'address',
    renderProps: {
      label: 'Token address',
      name: 'tokenAddress',
      type: 'input',
    },
    helperText: [
      'Please provide the address of the token that will be accepted from users as payment method.',
    ],
  },
  {
    id: 'rate',
    name: 'rate',
    isShort: true,
    renderProps: {
      label: 'Token rate',
      name: 'tokenRate',
      type: 'input',
    },
    helperText: [
      'Defines the rate of your token. 1-100000 numerals are accepted.',
    ],
  },
];

export const crowdsaleContractFormConfigSoftcap: CrowdsaleContractFieldType[] = [
  {
    id: 'softcapTokens',
    name: 'softcapTokens',
    renderProps: {
      label: 'Soft cap tokens',
      name: 'softcapTokens',
      InputProps: { endAdornment: <DescendingSortOrderIcon /> },
    },
    helperText: [
      'Defines the minimum number of tokens that needs to be sold for the project continuation. If soft cap is not reached - contributors get their investments back, project gets nothing. You can set it to 0 (no soft cap).',
    ],
    infoText: [
      'If softcap > 0 all investments are stored on the vault contract until the end of crowdsale.',
      'If you need to get investments on your address right away set softcap = 0.',
    ],
  },
];

export const crowdsaleContractFormConfigSaleDuration: CrowdsaleContractFieldType[] = [
  {
    id: 'saleDuration',
    name: 'saleDuration',
    renderProps: {
      label: 'Duration of Sale',
      name: 'saleDuration',
    },
    helperText: [
      'Define the number of days of how long the crowdsale will last.',
    ],
  },
];

export const crowdsaleContractFormConfigFlagOptions: ICrowdsaleContractFlagOption[] = [
  {
    id: 'changingDates',
    name: 'changingDates',
    title: 'Changing dates',
    icon: <Calendar />,
    helperText: [
      'Finish Dates can be changed manually after Contract Deployment. You can prolong sale or finish it early. Otherwise, dates are hardcoded and can`t be changed.',
    ],
  },
];

export const crowdsaleContractFormConfigEnd: ICrowdsaleContractSwitchableSection[] = [
  {
    id: 'minMaxInvestmentsSection',
    title: 'Min & Max investments',
    description: 'You can specify minimum/maximum amount of tokens hat user can buy per one transaction.',
    fields: [
      {
        id: 'minInvestments',
        name: 'minInvestments',
        renderProps: {
          label: 'Minimum',
          name: 'minInvestments',
        },
        helperText: [
          'Minimum amount accepted. "0" = No minimum limitation.',
        ],
      },
      {
        id: 'maxInvestments',
        name: 'maxInvestments',
        renderProps: {
          label: 'Maximum',
          name: 'maxInvestments',
        },
        helperText: [
          'Maximum amount accepted. it can not be higher hard cap.',
        ],
      },
    ],
  },
  {
    id: 'amountBonusSection',
    title: 'Amount Bonus',
    fields: [
      {
        id: 'amountBonus',
        name: 'amountBonus',
        renderProps: {
          label: 'Bonus',
          name: 'amountBonus',
          InputProps: {
            endAdornment: '%',
          },
        },
        helperText: [
          'Usually 0.1-100%. How many extra tokens will be sent to contributor.',
        ],
      },
      {
        id: 'minimumContribution',
        name: 'minimumContribution',
        renderProps: {
          label: 'Minimum',
          name: 'minimumContribution',
        },
        helperText: [
          'Minimum contribution for getting specified bonus',
        ],
      },
    ],
  },
];
