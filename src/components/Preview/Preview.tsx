import React, { FC, useState, useCallback } from 'react';

import {
  Box, Button, Container, IconButton, Typography,
} from '@material-ui/core';
import clsx from 'clsx';

import { Edit, TrashIcon } from 'theme/icons';
import { DisclaimerModal } from 'components/DisclaimerModal';
import { PaymentModal } from 'components/PaymentModal';
import { useStyles } from './Preview.styles';
import { iconHelper } from './Preview.helpers';

export interface PreviewProps {
  launchAction: () => void,
  editAction: () => void,
  deleteAction: () => void,
  type: 'token';
  name: string;
  className?: string;
}

export const Preview: FC<PreviewProps> = ({
  launchAction,
  editAction,
  deleteAction,
  name,
  type,
  children,
  className,
}) => {
  const classes = useStyles();
  const [isDisclaimerOpen, setDisclaimerOpen] = useState(false);
  const [isPaymentOpen, setPaymentOpen] = useState(false);

  const openDisclaimerModal = useCallback(() => {
    setDisclaimerOpen(true);
  }, []);

  const closeDisclaimerModal = useCallback(() => {
    setDisclaimerOpen(false);
  }, []);

  const openPaymentModal = useCallback(() => {
    closeDisclaimerModal();
    setPaymentOpen(true);
  }, []);

  const closePaymentModal = useCallback(() => {
    setPaymentOpen(false);
  }, []);
  return (
    <Container className={classes.root}>
      <Box className={clsx(classes.content, className)}>
        <Box className={classes.title}>
          <IconButton>{iconHelper[type]}</IconButton>
          <Typography className={classes.titleText} variant="h3">{name}</Typography>
        </Box>
        {children}
        <Box className={classes.stamp} />
      </Box>
      <Box className={classes.controls}>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          className={classes.button}
          onClick={openDisclaimerModal}
        >
          Launch
        </Button>
        <Box className={classes.editDeleteBtns}>
          <Button
            variant="outlined"
            size="large"
            className={clsx(classes.button, classes.editDelete)}
            endIcon={<Edit />}
            onClick={editAction}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            size="large"
            className={clsx(classes.button, classes.editDelete)}
            endIcon={<TrashIcon />}
            onClick={deleteAction}
          >
            Delete
          </Button>
        </Box>
      </Box>
      <DisclaimerModal
        open={isDisclaimerOpen}
        onClose={closeDisclaimerModal}
        onAccept={openPaymentModal}
      />
      <PaymentModal
        open={isPaymentOpen}
        onClose={closePaymentModal}
        onAccept={launchAction}
        paymentAmount="16,499.05"
      />
    </Container>
  );
};
