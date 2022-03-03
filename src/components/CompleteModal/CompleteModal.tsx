import React, { useMemo, VFC } from 'react';

import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { Modal } from 'components/Modal';
import { SuccessBigIcon, ErrorBigIcon } from 'theme/icons';
import { COMPLETE_MODAL_DEFAULT_SUCCESS_TEXT } from 'appConstants';
import { useStyles } from './CompleteModal.styles';

export interface CompleteModalProps {
  open: boolean;
  onClose?: () => void;
  result?: boolean;
  successText?: string;
}

export const CompleteModal: VFC<CompleteModalProps> = ({
  open, onClose, result, successText = COMPLETE_MODAL_DEFAULT_SUCCESS_TEXT,
}) => {
  const classes = useStyles();

  const showSuccess = useMemo(
    () => (
      <>
        <SuccessBigIcon />
        <Typography className={clsx(classes.desc, 'l')} variant="body1">
          {successText}
        </Typography>
      </>
    ),
    [classes.desc, successText],
  );

  const showError = useMemo(
    () => (
      <>
        <ErrorBigIcon />
        <Typography className={clsx(classes.desc, 'l')} variant="body1">
          {' '}
          Transaction error !
        </Typography>
        <Typography className={clsx(classes.desc, 'l')} variant="body1">
          {' '}
          Please come back later
        </Typography>
      </>
    ),
    [classes.desc],
  );

  return (
    <Modal open={open} onClose={onClose} title=" " className={clsx(classes.root)}>
      <Box className={classes.icon}>
        {result ? showSuccess : showError}
      </Box>
    </Modal>
  );
};
