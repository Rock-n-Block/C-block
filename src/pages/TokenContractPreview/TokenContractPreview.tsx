import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, Typography, Box } from '@material-ui/core';
import clsx from 'clsx';
import Web3 from 'web3';

import {
  Preview,
  YesNoBlock,
  Copyable,
  FullscreenLoader,
  CompleteModal,
} from 'components';
import { useShallowSelector } from 'hooks';
import contractFormsSelector from 'store/contractForms/selectors';
import uiSelector from 'store/ui/selectors';
import user from 'store/user/selectors';
import {
  RequestStatus, State, TokenContract, UserState,
} from 'types';
import { routes } from 'appConstants';

import { deleteTokenContractForm } from 'store/contractForms/reducer';
import { useWalletConnectorContext } from 'services';
import { createTokenContract } from 'store/contractForms/actions';
import actionTypes from 'store/contractForms/actionTypes';
import { useStyles } from './TokenContractPreview.styles';
import {
  dynamicTokenContractPreviewHelpers,
  staticTokenContractPreviewHelpers,
} from './TokenContractPreview.helpers';

export const TokenContractPreview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = useCallback(() => {
    dispatch(deleteTokenContractForm());
    navigate(routes.root);
  }, [dispatch, navigate]);
  const handleEdit = useCallback(() => {
    navigate(routes['token-contract'].root);
  }, [navigate]);

  const { wallet } = useShallowSelector<State, UserState>(user.getUser);
  const { walletService } = useWalletConnectorContext();
  const handleCreateContract = useCallback(async () => {
    const { celo } = window;
    const web3 = new Web3(celo);
    dispatch(
      createTokenContract({
        // @ts-ignore
        provider: wallet === 'celo' ? web3 : walletService.Web3(),
      }),
    );
  }, [dispatch, wallet, walletService]);

  const tokenContract = useShallowSelector<State, TokenContract>(
    contractFormsSelector.getTokenContract,
  );
  const createContractRequestStatus = useShallowSelector(
    uiSelector.getProp(actionTypes.CREATE_TOKEN_CONTRACT),
  );
  const isLoader = useMemo(
    () => createContractRequestStatus === RequestStatus.REQUEST,
    [createContractRequestStatus],
  );

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

  const classes = useStyles();
  let totalTokenAmount = 0;
  return (
    <Preview
      type="token"
      name={tokenContract.tokenName}
      launchAction={handleCreateContract}
      editAction={handleEdit}
      deleteAction={handleDelete}
    >
      {staticTokenContractPreviewHelpers.map((previewBlock, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Grid key={index} container className={classes.tokenContractInfoBlock}>
          {previewBlock.map(({
            key, label, value, shouldSkipObjectValue,
          }) => (
            <Grid key={label} item xs={6} sm={6} md={3} lg={3} xl={3}>
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

      <Box className={classes.tokenContractInfoBlock}>
        <Typography
          variant="body1"
          className={clsx(classes.tokenOwnerTitle, 'l')}
        >
          Token Owner
        </Typography>
        <Copyable
          className={classes.copyableContainer}
          onlyIconActive
          withBorder
          valueToCopy={tokenContract.tokenOwner}
        >
          <Typography noWrap>{tokenContract.tokenOwner}</Typography>
        </Copyable>
      </Box>

      <Typography className={classes.dynamicDataHeader} variant="h3">
        Token distribution
      </Typography>
      {tokenContract.tokens.map((tokenContractDynamicData, index) => {
        totalTokenAmount += +tokenContractDynamicData.amount;
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
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
              <Typography noWrap>{tokenContractDynamicData.address}</Typography>
            </Copyable>
            <Grid container className={classes.nameAmountData}>
              {dynamicTokenContractPreviewHelpers.map(
                ({ icon, key, label }) => {
                  if (
                    key === 'frozenUntilDate' &&
                    !tokenContractDynamicData.isFrozen
                  ) {
                    return null;
                  }

                  return (
                    <Grid key={key} item xs={6} sm={6} md={3} lg={3} xl={3}>
                      <Box
                        className={clsx(
                          classes.previewLabel, {
                            [classes.previewLabelWithIcon]: !!icon,
                          },
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
                      <Typography variant="body1" noWrap>
                        {tokenContractDynamicData[key]}
                      </Typography>
                    </Grid>
                  );
                },
              )}
            </Grid>
            {index === tokenContract.tokens.length - 1 && (
              <Typography
                variant="body1"
                className={clsx(classes.helperText, 'l')}
                color="textSecondary"
              >
                Total supply:{' '}
                <span className={classes.newCount}>
                  {`${totalTokenAmount} ${tokenContract.tokenSymbol}`}
                </span>
              </Typography>
            )}
          </Fragment>
        );
      })}
      {isLoader && <FullscreenLoader />}
      <CompleteModal
        open={resultModalState.open}
        result={resultModalState.result}
        onClose={handleCloseResultModal}
      />
    </Preview>
  );
};
