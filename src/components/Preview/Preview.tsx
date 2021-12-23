import React, { FC, useState, useCallback } from 'react';

import {
  Box, Button, Container, IconButton, Typography,
} from '@material-ui/core';
import clsx from 'clsx';

import { Edit, TrashIcon } from 'theme/icons';
import {
  PaymentModal, DisclaimerModal, Loader, CompleteModal,
} from 'components';
import { routes } from 'appConstants';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './Preview.styles';
import { iconHelper } from './Preview.helpers';

export interface PreviewProps {
  launchAction: () => void,
  editAction: () => void,
  deleteAction: () => void,
  type: IconType;
  name: string;
  className?: string;
}

type IconType = 'token' | 'weddingRing';

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
  const [isPaymentOpen, setPaymentOpen] = useState(true);
  const [isCompleteOpen, setCompleteOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

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

  const openCompleteModal = useCallback(() => {
    setCompleteOpen(true);
  }, []);

  const closeCompleteModal = useCallback(() => {
    setCompleteOpen(false);
  }, []);

  const onPay = useCallback(() => {
    launchAction();
    closePaymentModal();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      openCompleteModal();
    }, 1000);
    navigate(routes.root);
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
        onAccept={onPay}
        paymentAmount="16,499.05"
      />
      { isLoading && <Loader /> }
      <CompleteModal
        open={isCompleteOpen}
        onClose={closeCompleteModal}
        result
      />
    </Container>
  );
};
