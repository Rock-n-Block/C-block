import React, { VFC } from 'react';

import { Box, Button } from '@material-ui/core';
import clsx from 'clsx';

import { AddressButton } from 'components';
import { useStyles } from './ConnectButton.styles';

export interface ConnectButtonProps {
  address: string;
  handleModal: () => void;
  className?: string;
}

export const ConnectButton: VFC<ConnectButtonProps> = ({ address, handleModal, className }) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.root, className)}>
      {address !== '' ? (
        <AddressButton
          onClick={handleModal}
          address={address}
        />
      ) : (
        <Button
          variant="outlined"
          size="large"
          className={classes.connectButton}
          onClick={handleModal}
        >
          Connect Wallet
        </Button>
      )}
    </Box>
  );
};
