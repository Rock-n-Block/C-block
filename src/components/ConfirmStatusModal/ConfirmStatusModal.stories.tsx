import React, { FC } from 'react';
import { Container } from '@material-ui/core';

import { ConfirmStatusModal } from './ConfirmStatusModal';

import { mockedProps } from './ConfirmStatusModal.mock';

export default {
  title: 'components/ConfirmStatusModal',
  component: ConfirmStatusModal,
  decorators: [
    (Story) => (<Container><Story /></Container>),
  ],
};

export const Live: FC = () => (
  <ConfirmStatusModal {...mockedProps} statusType="live" />
);

export const Active: FC = () => (
  <ConfirmStatusModal {...mockedProps} statusType="active" />
);
