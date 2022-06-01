import React, { VFC } from 'react';

import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { Modal } from 'components/Modal';
import { Loader } from 'components';
import { useStyles } from './ConnectWalletLoadingModal.styles';

export interface ConnectWalletLoadingModalProps {
  open: boolean;
}

export const ConnectWalletLoadingModal: VFC<ConnectWalletLoadingModalProps> = ({
  open,
}) => {
  const classes = useStyles();

  return (
    <Modal open={open} title=" ">
      <Box className={classes.icon}>
        <Loader />
        <Typography className={clsx(classes.desc)} variant="h3">
          Connect wallet
        </Typography>
      </Box>
    </Modal>
  );
};
