import React, { VFC } from 'react';

import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { Modal } from 'components/Modal';
import { Loader } from 'components';
import { useStyles } from './LoadingModal.styles';

export interface LoadingModalProps {
  open: boolean;
  text?: string;
}

export const LoadingModal: VFC<LoadingModalProps> = ({
  open,
  text = '',
}) => {
  const classes = useStyles();

  return (
    <Modal open={open} title=" ">
      <Box className={classes.icon}>
        <Loader />
        <Typography className={clsx(classes.desc)} variant="h3">
          {text}
        </Typography>
      </Box>
    </Modal>
  );
};
