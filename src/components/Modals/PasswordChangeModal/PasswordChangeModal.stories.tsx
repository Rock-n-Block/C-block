import React, { FC } from 'react';
import { Container } from '@material-ui/core';

import { PasswordChangeModal } from './PasswordChangeModal';

import { mockedProps } from './PasswordChangeModal.mock';

export default {
  title: 'components/Modals/PasswordChangeModal',
  component: PasswordChangeModal,
};

export const Default: FC = () => (
  <Container>
    <PasswordChangeModal {...mockedProps} />
  </Container>
);
