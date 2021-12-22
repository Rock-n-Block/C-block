import React, { VFC } from 'react';

import clsx from 'clsx';
import { Modal } from 'components/Modal';
import { Box, Typography } from '@material-ui/core';
import { useStyles } from './CompleteModal.styles';
import { SuccessBigIcon } from '../../../theme/icons/components/SuccessBigIcon';
import { ErrorBigIcon } from '../../../theme/icons/components/ErrorBigIcon';

export interface PaymentModalProps {
  open: boolean;
  onClose?: () => void;
  onAccept?: () => void;
  paymentAmount?: string | number;
  className?: string;
  result?: boolean;
  isLoading?: boolean;
}

export const CompleteModal: VFC<PaymentModalProps> = ({
  open, onClose, result,
}) => {
  const classes = useStyles();

  const showSuccess = (
    <>
      <SuccessBigIcon />
      <Typography className={classes.desc} variant="body2">The transaction was successfully completed</Typography>
    </>
  );

  const showError = (
    <>
      <ErrorBigIcon />
      <Typography className={classes.desc} variant="body2"> Transaction error !</Typography>
      <Typography className={classes.desc} variant="body2"> Please  come back later</Typography>
    </>
  );

  const showResult = (
    <>{result ? showSuccess : showError}</>
  );

  return (
    <Modal open={open} onClose={onClose} className={clsx(classes.root)}>
      <Box className={classes.icon}>
        { showResult }
      </Box>
    </Modal>
  );
};
