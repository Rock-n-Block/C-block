/* eslint-disable newline-per-chained-call */
import { ReactElement } from 'react';
import * as Yup from 'yup';
import { contractNameSchema, ethereumAddressSchema } from 'utils';

export const validationSchema = Yup.object().shape({
  contractName: contractNameSchema.required(),
  partnerOneAddress: ethereumAddressSchema.notOneOf([Yup.ref('partnerTwoAddress')]).required(),
  partnerTwoAddress: ethereumAddressSchema.notOneOf([Yup.ref('partnerOneAddress')]).required(),
  partnerOneEmail: Yup.string().email().notOneOf([Yup.ref('partnerTwoEmail')]).max(255).required(),
  partnerTwoEmail: Yup.string().email().notOneOf([Yup.ref('partnerOneEmail')]).max(255).required(),
  daysForDivorceApproval: Yup.number().min(1).required(),
  daysForWithdrawalApproval: Yup.number().min(1).required(),
});

type WeddingContractFieldType = {
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

type TokenContractFormConfig = WeddingContractFieldType[][];

export const weddingContractFormConfigStart: TokenContractFormConfig = [
  [
    {
      id: 'contractName',
      name: 'contractName',
      renderProps: {
        label: 'Contract Name',
        name: 'contractName',
      },
    },
  ],
  [
    {
      id: 'partnerOneAddress',
      name: 'partnerOneAddress',
      renderProps: {
        label: 'Partner 1 address',
        name: 'partnerOneAddress',
      },
      helperText: ['Please paste here the addresses of spouses. These addresses will manage the contract.'],
    },
    {
      id: 'partnerTwoAddress',
      name: 'partnerTwoAddress',
      renderProps: {
        label: 'Partner 2 address',
        name: 'partnerTwoAddress',
      },
      helperText: ['When one partner initializes the divorce, the second partner has to approve in in a specified period of time.'],
    },
    {
      id: 'partnerOneEmail',
      name: 'partnerOneEmail',
      renderProps: {
        label: 'E-mail for notification Partner 1',
        name: 'partnerOneEmail',
      },
      helperText: ['Enter the e-mail address to which you want to send a message about transferring the crypto currency'],
    },
    {
      id: 'partnerTwoEmail',
      name: 'partnerTwoEmail',
      renderProps: {
        label: 'E-mail for notification Partner 2',
        name: 'partnerTwoEmail',
      },
      helperText: ['Enter the e-mail address to which you want to send a message about transferring the crypto currency'],
    },
  ],
  [
    {
      id: 'daysForDivorceApproval',
      name: 'daysForDivorceApproval',
      renderProps: {
        label: 'Days for divorce approval',
        name: 'daysForDivorceApproval',
      },
      helperText: ['When one partner initializes the divorce, the second partner has to approve in in a specified period of time.'],
    },
  ],
];

export const weddingContractFormConfigEnd: TokenContractFormConfig = [
  [{
    id: 'daysForWithdrawalApproval',
    name: 'daysForWithdrawalApproval',
    renderProps: {
      label: 'Days for withdrawal approval',
      name: 'daysForWithdrawalApproval',
    },
    helperText: [
      'When one partner initializes the divorce, the second partner has to approve in in a specified period of time.',
      'If there are no response from the second partner during the specified time the withdrawal will be considered approved',
    ],
  }],
];
