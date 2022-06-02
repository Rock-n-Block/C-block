import React, { FC } from 'react';
import { Container } from '@material-ui/core';

import { PasswordResetByEmailModal } from './PasswordResetByEmailModal';

import { mockedProps } from './PasswordResetByEmailModal.mock';

export default {
  title: 'components/Modals/PasswordResetByEmailModal',
  component: PasswordResetByEmailModal,
};

export const Default: FC = () => (
  <Container>
    <PasswordResetByEmailModal {...mockedProps} />
  </Container>
);
