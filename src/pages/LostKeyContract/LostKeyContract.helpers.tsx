// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement } from 'react';
import { TextFieldProps } from '@material-ui/core';
import * as Yup from 'yup';
import { latinAndNumbers } from 'utils';

export const validationSchema = Yup.object().shape({
  contractName: Yup.string().matches(latinAndNumbers).min(5).required(),
  managementAddress: Yup.string().length(42).required(),

  tokens: Yup.array().of(
    Yup.object().shape({
      address: Yup.string().length(42).required(),
      rate: Yup.number().min(1).max(100000)
        .required(),
    }),
  ),

  pingIntervalAsValue: Yup.number().positive().required(),
  pingIntervalAsDateUnits: Yup.string().required(),

  rewardAmount: Yup.number().positive().required(),

  // softcapTokens: Yup.number().integer().min(0).required(),
  // saleDuration: Yup.number().integer().min(1).required(),

  // minMaxInvestmentsSection: Yup.boolean(),
  // minInvestments: Yup
  //   .number()
  //   .max(Yup.ref('maxInvestments'))
  //   .when('minMaxInvestmentsSection', (value, schema) => (value ? schema.required() : schema)),
  // maxInvestments: Yup
  //   .number()
  //   .min(Yup.ref('minInvestments'))
  //   .when('minMaxInvestmentsSection', (value, schema) => (value ? schema.required() : schema)),

  // amountBonusSection: Yup.boolean(),
  // amountBonus: Yup
  //   .number()
  //   .when('amountBonusSection', (value, schema) => (value ? schema.required() : schema)),
  // minimumContribution: Yup
  //   .number()
  //   .min(Yup.ref('minInvestments'))
  //   .when('amountBonusSection', (value, schema) => (value ? schema.required() : schema)),
});

interface ISelectOption {
  key: string;
  text: string;
}

interface IFieldsFormConfig {
  key: string;
  name: string;
  title?: string;
  // icon?: ReactElement;
  renderProps?: {
    label?: string;
    name: string;
  } & TextFieldProps;
  helperText?: string[];
  selectOptions?: ISelectOption[];
}

interface ISectionFieldsConfig {
  key: string;
  title?: string;
  additionalText?: string[];
  helperText?: string[];
  fields: IFieldsFormConfig[];
}

export const contractNameSectionConfig: IFieldsFormConfig[] = [
  {
    key: 'contractName',
    name: 'contractName',
    renderProps: {
      label: 'Contract name',
      name: 'contractName',
    },
    helperText: [
      'Enter name of the project without spaces, usually 5-25 symbols. Lower and uppercase can be used',
    ],
  },
];

export const managementAddressSectionConfig: IFieldsFormConfig[] = [
  {
    key: 'managementAddress',
    name: 'managementAddress',
    title: 'Management address',
    helperText: [
      'This is the wallet address that will be traced for activity. If you want to use different wallet, please connect it for contract creation.',
    ],
  },
];

export const dynamicFormDataConfig: IFieldsFormConfig[] = [
  {
    key: 'reserveAddress',
    name: 'reserveAddress',
    renderProps: {
      label: 'Reserve address',
      name: 'reserveAddress',
      type: 'input',
    },
    helperText: [
      'Specify the backup address to which you want to send funds in the event that a private key is lost from the management address',
    ],
  },
  {
    key: 'email',
    name: 'email',
    renderProps: {
      label: 'E-mail for notification',
      name: 'email',
      type: 'input',
    },
    helperText: [
      'Enter the e-mail address to which you want to send a message about transferring the crypto currency',
    ],
  },
];

export const confirmLiveStatusSectionConfig: ISectionFieldsConfig = {
  key: 'confirmLiveStatusSection',
  title: 'Define how often you want to confirm your “Live” status',
  additionalText: ['Confirmation transaction every'],
  helperText: ['You will need to send transaction to the contract from management address every time.'],
  fields: [
    {
      key: 'pingIntervalAsValue',
      name: 'pingIntervalAsValue',
      renderProps: {
        label: '',
        name: 'pingIntervalAsValue',
      },
      helperText: [],
    },
    {
      key: 'pingIntervalAsDateUnits',
      name: 'pingIntervalAsDateUnits',
      renderProps: {
        label: '',
        name: 'pingIntervalAsDateUnits',
        select: true,
      },
      selectOptions: [
        {
          key: 'Day',
          text: 'Day',
        },
        {
          key: 'Month',
          text: 'Month',
        },
        {
          key: 'Year',
          text: 'Year',
        },
      ],
      helperText: [],
    },
  ],
};

export const rewardAmountSectionConfig: IFieldsFormConfig[] = [
  {
    key: 'rewardAmount',
    name: 'rewardAmount',
    renderProps: {
      label: 'Сelo',
      name: 'rewardAmount',
    },
    helperText: [
      'This amount of СELO will be paid as a reward to the person who will initiate and pay for gas of the transfer from management to reserve addresses after the conditions for such transfer are met.',
    ],
  },
];

// export const crowdsaleContractFormConfigEnd: ICrowdsaleContractSwitchableSection[] = [
//   {
//     id: 'minMaxInvestmentsSection',
//     title: 'Min & Max investments',
//     description: 'You can specify minimum/maximum amount of tokens hat user can buy per one transaction.',
//     fields: [
//       {
//         id: 'minInvestments',
//         name: 'minInvestments',
//         renderProps: {
//           label: 'Minimum',
//           name: 'minInvestments',
//         },
//         helperText: [
//           'Minimum amount accepted. "0" = No minimum limitation.',
//         ],
//       },
//       {
//         id: 'maxInvestments',
//         name: 'maxInvestments',
//         renderProps: {
//           label: 'Maximum',
//           name: 'maxInvestments',
//         },
//         helperText: [
//           'Maximum amount accepted. it can not be higher hard cap.',
//         ],
//       },
//     ],
//   },
//   {
//     id: 'amountBonusSection',
//     title: 'Amount Bonus',
//     fields: [
//       {
//         id: 'amountBonus',
//         name: 'amountBonus',
//         renderProps: {
//           label: 'Bonus',
//           name: 'amountBonus',
//           InputProps: {
//             endAdornment: '%',
//           },
//         },
//         helperText: [
//           'Usually 0.1-100%. How many extra tokens will be sent to contributor.',
//         ],
//       },
//       {
//         id: 'minimumContribution',
//         name: 'minimumContribution',
//         renderProps: {
//           label: 'Minimum',
//           name: 'minimumContribution',
//         },
//         helperText: [
//           'Minimum contribution for getting specified bonus',
//         ],
//       },
//     ],
//   },
// ];
