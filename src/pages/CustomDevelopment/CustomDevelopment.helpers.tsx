import React from 'react';
import * as Yup from 'yup';

import { CUSTOM_DEVELOPMENT_EMAIL } from 'appConstants';
import {
  EmailIcon,
  FileTextIcon,
  PersonIcon,
} from 'theme/icons';

export type CustomDevelopmentFormValues = {
  userName: string;
  email: string;
  contractName: string;
  request: string;
};

export const initFormValues: CustomDevelopmentFormValues = {
  userName: '',
  email: '',
  contractName: '',
  request: '',
};

// eslint-disable-next-line arrow-body-style
export const isAtLeastOneFormFieldFilled = (form: CustomDevelopmentFormValues) => {
  return Object.keys(form).some((key: keyof CustomDevelopmentFormValues) => Boolean(form[key].length));
};

export const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .min(6)
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  contractName: Yup.string()
    .min(6)
    .required('Required'),
  request: Yup.string()
    .min(6)
    .max(350)
    .required('Required'),
});

export const customDevelopmentFormConfig = [
  {
    id: 'userName',
    name: 'userName',
    renderProps: {
      label: 'User name',
      InputProps: { endAdornment: <PersonIcon /> },
      name: 'userName',
    },
  },
  {
    id: 'email',
    name: 'email',
    renderProps: {
      label: 'Email',
      InputProps: { endAdornment: <EmailIcon /> },
      name: 'email',
    },
  },
  {
    id: 'contractName',
    name: 'contractName',
    renderProps: {
      label: 'Contract name',
      InputProps: { endAdornment: <FileTextIcon /> },
      name: 'contractName',
    },
  },
  {
    id: 'request',
    name: 'request',
    renderProps: {
      label: 'Your Request',
      InputLabelProps: { shrink: true },
      placeholder: 'Please describe what kind of the development do you need (new blockchain creation, token contract, individual smart contract etc.)',
      multiline: true,
      name: 'request',
    },
  },
];

export const constructEmailSheet = (values: CustomDevelopmentFormValues) => {
  const {
    contractName, userName, email, request,
  } = values;
  const subject = encodeURIComponent(
    `C-Block Platform. Custom Development: ${contractName} for ${userName}`,
  );
  const body = encodeURIComponent(
    `User name: ${userName}

Original email: ${email}

Contract name: ${contractName}

Request: ${request}
`,
  );

  return `mailto:${CUSTOM_DEVELOPMENT_EMAIL}?subject=${subject}&body=${body}`;
};

export const sendEmail = (values: CustomDevelopmentFormValues) => {
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = constructEmailSheet(values);
  link.rel = 'noopener noreferrer';
  link.target = '_blank';

  link.click();
};
