import React, { FC } from 'react';
import { Container } from '@material-ui/core';

import { CompleteModal } from './CompleteModal';

import { mockedProps } from './CompleteModal.mock';

export default {
  title: 'components/CompleteModal',
  component: CompleteModal,
  decorators: [
    (Story) => (<Container><Story /></Container>),
  ],
};

export const WithResult: FC = () => (
  <CompleteModal {...mockedProps} result />
);

export const WithoutResult: FC = () => (
  <CompleteModal {...mockedProps} result={false} />
);
