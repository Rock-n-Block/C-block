import React, { useMemo, VFC } from 'react';
import {
  Typography, Button, Box, IconButton,
} from '@material-ui/core';
import clsx from 'clsx';

import userSelector from 'store/user/selectors';
import { useShallowSelector } from 'hooks';
import { Modal } from 'components/Modal';
import { FileTextIcon, WalletIcon } from 'theme/icons';
import { useStyles } from './PaymentModal.styles';

export interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  paymentAmount: string | number;
  className?: string;
}

export const PaymentModal: VFC<PaymentModalProps> = ({
  open, onClose, onAccept, className, paymentAmount,
}) => {
  const classes = useStyles();

  const { isLight } = useShallowSelector(userSelector.getUser);

  const title = useMemo(() => (
    <Box className={classes.paymentInfoIcon}>
      <IconButton><WalletIcon /></IconButton>
      <Typography
        align="left"
        className={isLight ? '' : 'acidGreen gradient'}
        variant="h2"
      >
        Payment
      </Typography>
    </Box>
  ), [classes.paymentInfoIcon, isLight]);

  return (
    <Modal title={title} open={open} onClose={onClose} className={clsx(classes.root, className)}>
      <Box className={classes.paymentInfoHelper}>
        <Typography variant="body1" className="s" color="textSecondary">Position</Typography>
        <Typography variant="body1" className="s" color="textSecondary">Price</Typography>
      </Box>
      <Box className={classes.paymentInfo}>
        <Box className={classes.paymentInfoIcon}>
          <FileTextIcon />
          <Typography variant="body1">Create contract</Typography>
        </Box>
        <Typography variant="body1">{paymentAmount}</Typography>
      </Box>
      <Box className={classes.paymentControls}>
        <Button
          size="large"
          type="submit"
          color="secondary"
          variant="outlined"
          className={clsx(classes.payButton, classes.button)}
          onClick={onAccept}
        >
          Pay
        </Button>
        <Button
          size="large"
          type="reset"
          variant="outlined"
          className={clsx(classes.cancelButton, classes.button)}
          onClick={onClose}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};
