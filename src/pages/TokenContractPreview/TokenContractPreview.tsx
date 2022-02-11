import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, Typography, Box } from '@material-ui/core';

import {
  Preview,
  YesNoBlock,
  Copyable,
  Loader,
  CompleteModal,
} from 'components';
import { useShallowSelector } from 'hooks';
import contractFormsSelector from 'store/contractForms/selectors';
import uiSelector from 'store/ui/selectors';
import user from 'store/user/selectors';
import {
  ContractFormsState,
  RequestStatus,
  State,
  UserState,
} from 'types';
import clsx from 'clsx';
import { routes } from 'appConstants';

import { deleteTokenContractForm } from 'store/contractForms/reducer';
import { useWalletConnectorContext } from 'services';
import { createTokenContract } from 'store/contractForms/actions';
import Web3 from 'web3';
import actionTypes from 'store/contractForms/actionTypes';
import { useStyles } from './TokenContractPreview.styles';
import {
  dynamicTokenContractPreviewHelpers,
  staticTokenContractPreviewHelpers,
} from './TokenContractPreview.helpers';

export const TokenContractPreview = () => {
  const { tokenContract } = useShallowSelector<State, ContractFormsState>(
    contractFormsSelector.getContractForms,
  );

  const createTokenRequestStatus = useShallowSelector(uiSelector.getProp(actionTypes.CREATE_TOKEN_CONTRACT));

  const [resultModalState, setResultModalState] = useState({
    open: false,
    result: false,
  });

  const handleCloseResultModal = useCallback(() => {
    setResultModalState({
      ...resultModalState,
      open: false,
    });
  }, [resultModalState]);

  const isLoader = useMemo(() => createTokenRequestStatus === RequestStatus.REQUEST, [createTokenRequestStatus]);

  const { wallet } = useShallowSelector<State, UserState>(
    user.getUser,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { walletService } = useWalletConnectorContext();

  const handleEdit = useCallback(() => {
    navigate(routes['token-contract'].root);
  }, [navigate]);

  const handleDelete = useCallback(() => {
    dispatch(deleteTokenContractForm());
    navigate(routes.root);
  }, [dispatch, navigate]);

  const handleCreateToken = useCallback(async () => {
    const { celo } = window;
    const web3 = new Web3(celo);
    dispatch(createTokenContract({
      // @ts-ignore
      provider: wallet === 'celo' ? web3 : walletService.Web3(),
    }));
  }, [dispatch, wallet, walletService]);

  useEffect(() => {
    if (createTokenRequestStatus === RequestStatus.SUCCESS) {
      setResultModalState({
        open: true,
        result: true,
      });
    }
    if (createTokenRequestStatus === RequestStatus.ERROR) {
      setResultModalState({
        open: true,
        result: false,
      });
    }
  }, [createTokenRequestStatus]);

  const classes = useStyles();
  let totalTokenAmount = 0;
  return (
    <Preview
      type="token"
      name={tokenContract.tokenName}
      launchAction={handleCreateToken}
      editAction={handleEdit}
      deleteAction={handleDelete}
    >
      {staticTokenContractPreviewHelpers.map((previewBlock, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Grid container className={classes.tokenContractInfoBlock} key={index}>
          {previewBlock.map(({
            key, label, value, shouldSkipObjectValue,
          }) => (
            <Grid
              item
              xs={6}
              sm={6}
              md={3}
              lg={3}
              xl={3}
              key={label}
            >
              <Typography
                variant="body1"
                className={clsx(classes.previewLabel, 's')}
                color="textSecondary"
              >
                {label}
              </Typography>
              {typeof tokenContract[key] !== 'boolean' ? (
                <Typography variant="body1">
                  {shouldSkipObjectValue ? value : tokenContract[key]}
                </Typography>
              ) : (
                <YesNoBlock yes={tokenContract[key]} justify="normal" />
              )}
            </Grid>
          ))}
        </Grid>
      ))}

      <Typography variant="body1" className={clsx(classes.tokenOwnerTitle, 'l')}>Token Owner</Typography>
      <Copyable onlyIconActive withBorder valueToCopy={tokenContract.tokenOwner} className={classes.copyableContainer}>
        <Typography noWrap>{tokenContract.tokenOwner}</Typography>
      </Copyable>
      <Typography className={classes.dynamicDataHeader} variant="h3">Token distribution</Typography>
      {tokenContract.tokens.map((tokenContractDynamicData, index) => {
        totalTokenAmount += +tokenContractDynamicData.amount;
        return (
          <>
            <Typography
              variant="body1"
              className={clsx(classes.previewLabel, 's')}
              color="textSecondary"
            >
              Address:
            </Typography>
            <Copyable
              onlyIconActive
              withBorder
              valueToCopy={tokenContractDynamicData.address}
              className={classes.copyableContainer}
            >
              <Typography noWrap>
                {tokenContractDynamicData.address}
              </Typography>
            </Copyable>
            <Grid container className={classes.nameAmountData}>
              {dynamicTokenContractPreviewHelpers.map(({ icon, key, label }) => {
                if (key === 'frozenUntilDate' && !tokenContractDynamicData.isFrozen) {
                  return null;
                }

                return (
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={3}
                    lg={3}
                    xl={3}
                    key={key}
                  >
                    <Box
                      className={clsx(
                        classes.previewLabel,
                        classes.frozenUntil,
                      )}
                    >
                      {icon}
                      <Typography
                        variant="body1"
                        className="s"
                        color="textSecondary"
                      >
                        {label}
                      </Typography>
                    </Box>
                    <Typography variant="body1">
                      {tokenContractDynamicData[key]}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
            {index === tokenContract.tokens.length - 1 && (
              <Typography
                variant="body1"
                className={clsx(classes.helperText, 'l')}
                color="textSecondary"
              >
                Total supply:{' '}
                <span className={classes.newCount}>
                  {`${totalTokenAmount} New`}
                </span>
              </Typography>
            )}
          </>
        );
      })}
      {isLoader && (
        <Loader />
      )}
      <CompleteModal
        open={resultModalState.open}
        result={resultModalState.result}
        onClose={handleCloseResultModal}
      />
    </Preview>
  );
};
