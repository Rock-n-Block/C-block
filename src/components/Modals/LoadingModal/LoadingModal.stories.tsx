import React, { FC } from 'react';
import { Container } from '@material-ui/core';

import { LoadingModal } from './LoadingModal';

import { mockedProps } from './LoadingModal.mock';

export default {
  title: 'components/Modals/LoadingModal',
  component: LoadingModal,
  decorators: [
    (Story) => (<Container><Story /></Container>),
  ],
};

export const Default: FC = () => (
  <LoadingModal {...mockedProps} />
);
