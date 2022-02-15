import React, { FC } from 'react';
import { Container } from '@material-ui/core';

import { AdditionalContentRequestDivorce } from './AdditionalContentRequestDivorce';

import { mockedProps } from './AdditionalContentRequestDivorce.mock';

export default {
  title: 'components/MyContracts/AdditionalContentRequestDivorce',
  component: AdditionalContentRequestDivorce,
  decorators: [
    (Story) => (<Container><Story /></Container>),
  ],
};

export const Default: FC = () => (
  <AdditionalContentRequestDivorce {...mockedProps} />
);
