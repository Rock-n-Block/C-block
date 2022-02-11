import React, { FC } from 'react';
import { Container } from '@material-ui/core';

import { AdditionalContentRequestWithdrawal } from './AdditionalContentRequestWithdrawal';

import { mockedProps } from './AdditionalContentRequestWithdrawal.mock';

export default {
  title: 'components/MyContracts/AdditionalContentRequestWithdrawal',
  component: AdditionalContentRequestWithdrawal,
  decorators: [
    (Story) => (<Container><Story /></Container>),
  ],
};

export const Default: FC = () => (
  <AdditionalContentRequestWithdrawal {...mockedProps} />
);
