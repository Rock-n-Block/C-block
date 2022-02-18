import React, {
  FC, useState, useCallback, useMemo, useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';

import { Edit, TrashIcon } from 'theme/icons';
import {
  PaymentModal,
  DisclaimerModal,
  CompleteModal,
  FullscreenLoader,
} from 'components';
import { useProvider, useShallowSelector } from 'hooks';
import actionTypes from 'store/contractForms/actionTypes';
import contractFormsSelector from 'store/contractForms/selectors';
import userSelector from 'store/user/selectors';
import uiSelector from 'store/ui/selectors';
import apiActions from 'store/ui/actions';
import { RequestStatus, State, UserState } from 'types';
import { getContractCreationPrice } from 'store/contractForms/actions';
import { getTokenAmountDisplay } from 'utils';
import { getCeloConfigMetamask } from 'config';
import { iconHelper, IconType } from './Preview.helpers';
import { useStyles } from './Preview.styles';

export interface PreviewProps {
  className?: string;
  type: IconType;
  name: string;
  launchAction: () => void;
  editAction: () => void;
  deleteAction: () => void;
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
  const dispatch = useDispatch();
  const { getDefaultProvider } = useProvider();
  const { isMainnet } = useShallowSelector<State, UserState>(
    userSelector.getUser,
  );
  const [isDisclaimerOpen, setDisclaimerOpen] = useState(false);
  const [isPaymentOpen, setPaymentOpen] = useState(false);
  const [resultModalState, setResultModalState] = useState({
    open: false,
    result: false,
  });

  const openDisclaimerModal = useCallback(() => {
    setDisclaimerOpen(true);
  }, []);
  const closeDisclaimerModal = useCallback(() => {
    setDisclaimerOpen(false);
  }, []);

  const openPaymentModal = useCallback(async () => {
    dispatch(
      getContractCreationPrice({
        provider: getDefaultProvider(),
        contractType: type,
      }),
    );
    closeDisclaimerModal();
    setPaymentOpen(true);
  }, [closeDisclaimerModal, dispatch, getDefaultProvider, type]);
  const closePaymentModal = useCallback(() => {
    dispatch(apiActions.reset(actionTypes.GET_CONTRACT_CREATION_PRICE));
    setPaymentOpen(false);
  }, [dispatch]);

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

  const contractActionType = useMemo(() => {
    switch (type) {
      case 'token':
        return actionTypes.CREATE_TOKEN_CONTRACT;
      case 'lostkey':
        return actionTypes.CREATE_LOSTKEY_CONTRACT;
      case 'will':
        return actionTypes.CREATE_WILL_CONTRACT;
      default:
        return null;
    }
  }, [type]);
  const createContractRequestStatus = useShallowSelector(
    uiSelector.getProp(contractActionType),
  );
  const paymentModalRequestStatus = useShallowSelector(
    uiSelector.getProp(actionTypes.GET_CONTRACT_CREATION_PRICE),
  );
  const isLoader = useMemo(
    () => createContractRequestStatus === RequestStatus.REQUEST ||
      paymentModalRequestStatus === RequestStatus.REQUEST,
    [createContractRequestStatus, paymentModalRequestStatus],
  );

  const closeResultModal = useCallback(() => {
    setResultModalState({
      ...resultModalState,
      open: false,
    });
    dispatch(apiActions.reset(contractActionType));
  }, [contractActionType, dispatch, resultModalState]);

  const contractForms = useShallowSelector(
    contractFormsSelector.getContractForms,
  );
  const celoDecimals = useMemo(
    () => getCeloConfigMetamask(isMainnet)[0].nativeCurrency.decimals,
    [isMainnet],
  );
  const paymentModalAmount = useMemo(() => {
    let ret: string;
    switch (type) {
      case 'token': {
        ret = contractForms.tokenContract.additional.contractCreationPrice;
        break;
      }
      case 'lostkey': {
        ret = contractForms.lostKeyContract.additional.contractCreationPrice;
        break;
      }
      case 'will': {
        ret = contractForms.willContract.additional.contractCreationPrice;
        break;
      }
      default:
        break;
    }
    return getTokenAmountDisplay(ret, celoDecimals);
  }, [
    celoDecimals,
    contractForms.lostKeyContract.additional.contractCreationPrice,
    contractForms.tokenContract.additional.contractCreationPrice,
    contractForms.willContract.additional.contractCreationPrice,
    type,
  ]);

  useEffect(() => {
    switch (createContractRequestStatus) {
      case RequestStatus.SUCCESS: {
        setResultModalState({
          open: true,
          result: true,
        });
        break;
      }
      case RequestStatus.ERROR: {
        setResultModalState({
          open: true,
          result: false,
        });
        break;
      }
      default: {
        break;
      }
    }
  }, [createContractRequestStatus]);

  return (
    <Container className={classes.root}>
      <Box className={clsx(classes.content, className)}>
        <Box className={classes.title}>
          <IconButton>{iconHelper[type]}</IconButton>
          <Typography className={classes.titleText} variant="h3">
            {name}
          </Typography>
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
        paymentAmount={paymentModalAmount}
      />
      {isLoader && <FullscreenLoader />}
      <CompleteModal
        open={resultModalState.open}
        result={resultModalState.result}
        onClose={closeResultModal}
      />
    </Container>
  );
};
