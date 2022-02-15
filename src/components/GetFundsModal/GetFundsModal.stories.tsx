import React, { FC } from 'react';
import { Container } from '@material-ui/core';

import { GetFundsModal } from './GetFundsModal';

import { getFundsModalPropsMocked } from './GetFundsModal.mock';

export default {
  title: 'components/GetFundsModal',
  component: GetFundsModal,
};

export const Default: FC = () => (
  <Container>
    <GetFundsModal {...getFundsModalPropsMocked} />
  </Container>
);
