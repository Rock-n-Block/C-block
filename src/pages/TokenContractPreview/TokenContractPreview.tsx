import React, {
  Fragment, useCallback, useMemo,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, Typography, Box } from '@material-ui/core';
import clsx from 'clsx';

import {
  Preview,
  YesNoBlock,
  Copyable,
} from 'components';
import { useWeb3Provider, useShallowSelector } from 'hooks';
import {
  TPreviewContractNavigationState, TokenContract,
} from 'types';
import contractFormsSelector from 'store/contractForms/selectors';
import { routes } from 'appConstants';

import { deleteTokenContractForm } from 'store/contractForms/reducer';
import { createTokenContract } from 'store/contractForms/actions';
import {
  dynamicTokenContractPreviewHelpers,
  staticTokenContractPreviewHelpers,
} from './TokenContractPreview.helpers';
import { useStyles } from './TokenContractPreview.styles';

export const TokenContractPreview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getDefaultProvider } = useWeb3Provider();
  const handleDelete = useCallback(() => {
    dispatch(deleteTokenContractForm());
    navigate(routes.root);
  }, [dispatch, navigate]);
  const handleEdit = useCallback(() => {
    navigate(routes['token-contract'].root);
  }, [navigate]);

  const handleCreateContract = useCallback(async () => {
    dispatch(
      createTokenContract({
        provider: getDefaultProvider(),
      }),
    );
  }, [dispatch, getDefaultProvider]);

  const { state }: { state: TPreviewContractNavigationState } = useLocation();
  const tokenContractFromStore = useShallowSelector(contractFormsSelector.getTokenContract);
  const tokenContract = useMemo(
    () => state?.contractPreview?.data as TokenContract || tokenContractFromStore,
    [state?.contractPreview?.data, tokenContractFromStore],
  );

  const classes = useStyles();
  let totalTokenAmount = 0;
  return (
    <Preview
      type="token"
      name={tokenContract.tokenName}
      launchAction={handleCreateContract}
      editAction={handleEdit}
      deleteAction={handleDelete}
      isReadonly={state?.contractPreview?.isReadonly}
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
    </Preview>
  );
};
