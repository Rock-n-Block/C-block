import React, { FC } from 'react';
import { Container } from '@material-ui/core';

import { PasswordResetModal } from './PasswordResetModal';

import { mockedProps } from './PasswordResetModal.mock';

export default {
  title: 'components/Modals/PasswordResetModal',
  component: PasswordResetModal,
};

export const Default: FC = () => (
  <Container>
    <PasswordResetModal {...mockedProps} />
  </Container>
);
