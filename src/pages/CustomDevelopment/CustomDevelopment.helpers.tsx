import React from 'react';
import {
  EmailIcon,
  FileTextIcon,
  PersonIcon,
} from 'theme/icons';
import * as Yup from 'yup';

export const initFormValues = {
  userName: '',
  email: '',
  contractName: '',
  request: '',
};

// eslint-disable-next-line arrow-body-style
export const isAtLeastOneFormFieldFilled = (form: typeof initFormValues) => {
  return Object.keys(form).some((key: keyof typeof form) => Boolean(form[key].length));
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
