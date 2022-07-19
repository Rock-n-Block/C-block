import React from 'react';
import * as Yup from 'yup';
import { EmailIcon } from 'theme/icons';

export interface IFormValues {
  email: string;
  request: string;
}

export const initFormValues: IFormValues = {
  email: '',
  request: '',
};

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  request: Yup.string()
    .min(6)
    .max(350)
    .required('Required'),
});

export const formConfig = [
  {
    id: 'email',
    name: 'email',
    renderProps: {
      label: 'To:',
      InputProps: { readOnly: true, endAdornment: <EmailIcon /> },
      name: 'email',
      disabled: true,
    },
  },
  {
    id: 'request',
    name: 'request',
    renderProps: {
      label: 'Your Request',
      InputLabelProps: { shrink: true },
      placeholder: 'Dear @username ...',
      multiline: true,
      name: 'request',
    },
  },
];
