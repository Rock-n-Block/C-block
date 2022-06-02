import React, { FC } from 'react';
import { Container } from '@material-ui/core';

import { LoginModal } from './LoginModal';

import { mockedProps } from './LoginModal.mock';

export default {
  title: 'components/Modals/LoginModal',
  component: LoginModal,
};

export const Default: FC = () => (
  <Container>
    <LoginModal {...mockedProps} />
  </Container>
);
