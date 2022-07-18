import React, { FC } from 'react';
import { Container } from '@material-ui/core';

import { SendEmailModal } from './SendEmailModal';

import { mockedProps } from './SendEmailModal.mock';

export default {
  title: 'components/Modals/SendEmailModal',
  component: SendEmailModal,
};

export const Default: FC = () => (
  <Container>
    <SendEmailModal {...mockedProps} />
  </Container>
);
