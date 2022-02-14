/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Container, IconButton, Typography,
} from '@material-ui/core';
import clsx from 'clsx';

import { Edit, TrashIcon } from 'theme/icons';
import {
  PaymentModal, DisclaimerModal, Loader, CompleteModal,
} from 'components';
import { routes } from 'appConstants';
import { iconHelper } from './Preview.helpers';
import { useStyles } from './Preview.styles';

type IconType = keyof typeof iconHelper;
export interface PreviewProps {
  className?: string;
  type: IconType;
  name: string;
  launchAction: () => void,
  editAction: () => void,
  deleteAction: () => void,
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
  const [isCompleteOpen, setCompleteOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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
  }, [closeDisclaimerModal]);

  const closePaymentModal = useCallback(() => {
    setPaymentOpen(false);
  }, []);

  const openCompleteModal = useCallback(() => {
    setCompleteOpen(true);
  }, []);

  const closeCompleteModal = useCallback(() => {
    setCompleteOpen(false);
  }, []);

  const onPay = useCallback(async () => {
    await launchAction();
    closePaymentModal();
    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    //   openCompleteModal();
    // }, 1000);
    // setTimeout(() => {
    //   navigate(routes.root);
    //   deleteAction();
    // }, 6000);
  }, [closePaymentModal, launchAction]);

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
