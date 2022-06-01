import React, { FC } from 'react';
import { Container } from '@material-ui/core';

import { ConnectWalletLoadingModal } from './ConnectWalletLoadingModal';

import { mockedProps } from './ConnectWalletLoadingModal.mock';

export default {
  title: 'components/Modals/ConnectWalletLoadingModal',
  component: ConnectWalletLoadingModal,
  decorators: [
    (Story) => (<Container><Story /></Container>),
  ],
};

export const Default: FC = () => (
  <ConnectWalletLoadingModal {...mockedProps} />
);
