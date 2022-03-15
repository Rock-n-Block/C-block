/* eslint-disable react/no-array-index-key */
import React, {
  ComponentProps,
  FC, useCallback, useEffect, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Box,
} from '@material-ui/core';

import { CompleteModal, EmptyTableBlock, SendTransactionModal } from 'components';
import { useDelayedTask, useShallowSelector } from 'hooks';
import uiSelector from 'store/ui/selectors';
import apiActions from 'store/ui/actions';
import actionTypes from 'store/earn/actionTypes';
import { RequestStatus } from 'types';
import { EarnListRow, EarnTable } from './components';
import {
  pageMainConfig,
} from './Earn.helpers';
import { useEarnData } from './Earn.hooks';
import { useStyles } from './Earn.styles';

export const Earn: FC = () => {
  const classes = useStyles();
  const {
    finishedContracts,
    hasTableData,
    getRowItemData,
    handleTransfer,
    getFinishedContracts,
  } = useEarnData();

  const dispatch = useDispatch();

  const [isSendTransactionModalOpen, setIsSendTransactionModalOpen] = useState(false);
  const openSendTransactionModal = useCallback(() => setIsSendTransactionModalOpen(true), []);
  const [
    resultModalState, setResultModalState,
  ] = useState<ComponentProps<typeof CompleteModal>>({ open: false, result: false });
  const closeSendTransactionModal = useCallback(() => setIsSendTransactionModalOpen(false), []);
  const closeResultModal = useCallback(() => {
    setResultModalState({
      ...resultModalState,
      open: false,
    });
    dispatch(apiActions.reset(actionTypes.TRANSFER_REWARD));
  }, [dispatch, resultModalState]);

  const onRequestTx = useCallback(() => {
    openSendTransactionModal();
  }, [openSendTransactionModal]);
  const onSuccessTx = useCallback(() => {
    setResultModalState({ open: true, result: true });
  }, []);
  const onErrorTx = useCallback(() => {
    setResultModalState({ open: true, result: false });
  }, []);
  const onFinishTx = useCallback(() => {
    closeSendTransactionModal();
  }, [closeSendTransactionModal]);

  const transferRewardRequestStatus = useShallowSelector(
    uiSelector.getProp(actionTypes.TRANSFER_REWARD),
  );

  useEffect(() => {
    switch (transferRewardRequestStatus) {
      case RequestStatus.REQUEST: {
        onRequestTx();
        break;
      }
      case RequestStatus.SUCCESS: {
        onSuccessTx();
        onFinishTx();
        break;
      }
      case RequestStatus.ERROR: {
        onErrorTx();
        onFinishTx();
        break;
      }
      default: {
        break;
      }
    }
  }, [transferRewardRequestStatus, onErrorTx, onFinishTx, onRequestTx, onSuccessTx]);

  useDelayedTask(getFinishedContracts);

  return (
    <Container className={classes.root}>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={6}>
          <Typography className="l" variant="body1">
            {pageMainConfig.description}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <EarnTable
            className={classes.tableContainer}
          />

          <Box className={classes.mobileTableData}>
            {
              hasTableData ? (
                finishedContracts.map((item, rowIndex) => {
                  const rowKey = JSON.stringify(item) + rowIndex;
                  const { deserializedRewardAmount } = getRowItemData(item);
                  return (
                    <EarnListRow
                      key={rowKey}
                      userAddress={item.address}
                      reward={deserializedRewardAmount}
                      onTransfer={() => handleTransfer(item)}
                    />
                  );
                })
              ) : (
                <EmptyTableBlock />
              )
            }
          </Box>
        </Grid>
      </Grid>
      <CompleteModal
        open={resultModalState.open}
        result={resultModalState.result}
        onClose={closeResultModal}
      />
      <SendTransactionModal
        open={isSendTransactionModalOpen}
        setIsModalOpen={setIsSendTransactionModalOpen}
      />
    </Container>
  );
};
