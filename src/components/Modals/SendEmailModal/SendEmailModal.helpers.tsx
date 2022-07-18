import React from 'react';
import * as Yup from 'yup';
import { EmailIcon } from 'theme/icons';

export interface IFormValues {
  emailTo: string;
  request: string;
}

export const initFormValues: IFormValues = {
  emailTo: '',
  request: '',
};

export const validationSchema = Yup.object().shape({
  emailTo: Yup.string()
    .email('Invalid email')
    .required('Required'),
  request: Yup.string()
    .min(6)
    .max(350)
    .required('Required'),
});

export const formConfig = [
  {
    id: 'emailTo',
    name: 'emailTo',
    renderProps: {
      label: 'To:',
      InputProps: { endAdornment: <EmailIcon /> },
      name: 'email',
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

export const constructEmailSheet = (values: IFormValues) => {
  const {
    emailTo, request,
  } = values;
  const subject = encodeURIComponent(
    'C-Block Platform',
  );
  const body = encodeURIComponent(
    `${request}
`,
  );

  return `mailto:${emailTo}?subject=${subject}&body=${body}`;
};

export const sendEmail = (values: IFormValues) => {
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = constructEmailSheet(values);
  link.rel = 'noopener noreferrer';
  link.target = '_blank';

  link.click();
};
