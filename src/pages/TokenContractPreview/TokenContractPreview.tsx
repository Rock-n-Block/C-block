/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import { Preview } from 'components/Preview';
import { useShallowSelector } from 'hooks';
import contractFormsSelector from 'store/contractForms/selectors';
import { ContractFormsState, State } from 'types';
import { Grid, Typography, Box } from '@material-ui/core';
import { YesNoBlock } from 'components/YesNoBlock';
import clsx from 'clsx';
import { Copyable } from 'components/Copyable';
import { routes } from 'appConstants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteTokenContractForm } from 'store/contractForms/reducer';
import { getTokenAmount } from 'utils';
import { useStyles } from './TokenContractPreview.styles';
import { dynamicTokenContractPreviewHelpers, staticTokenContractPreviewHelpers } from './TokenContractPreview.helpers';

export const TokenContractPreview = () => {
  const {
    tokenContract,
  } = useShallowSelector<State, ContractFormsState>(contractFormsSelector.getContractForms);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = useCallback(() => {
    navigate(routes['token-contract'].root);
  }, []);

  const handleDelete = useCallback(() => {
    dispatch(deleteTokenContractForm());
    navigate(routes.root);
  }, []);

  const classes = useStyles();
  return (
    <Preview
      type="token"
      name={tokenContract.tokenName}
      launchAction={() => alert('launch')}
      editAction={handleEdit}
      deleteAction={handleDelete}
    >
      {staticTokenContractPreviewHelpers.map((previewBlock, index) => (
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
              className={classes.previewValueBlock}
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
                <YesNoBlock yes={tokenContract[key]} />
              )}
            </Grid>
          ))}
        </Grid>
      ))}

      <Typography variant="body1" className={clsx(classes.tokenOwnerTitle, 'l')}>Token Owner</Typography>
      <Copyable onlyIconActive withBorder valueToCopy={tokenContract.tokenOwner} className={classes.copyableContainer}>
        <Typography className={classes.copyableText}>{tokenContract.tokenOwner}</Typography>
      </Copyable>
      <Typography className={classes.dynamicDataHeader} variant="h3">Token distribution</Typography>
      {tokenContract.tokens.map((tokenContractDynamicData, index) => {
        let totalTokenAmount = 0;
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
            <Copyable onlyIconActive withBorder valueToCopy={tokenContractDynamicData.address} className={classes.copyableContainer}>
              <Typography className={classes.copyableText}>{tokenContractDynamicData.address}</Typography>
            </Copyable>
            <Grid container className={classes.nameAmountData}>
              {dynamicTokenContractPreviewHelpers.map(({ icon, key, label }) => {
                if (tokenContractDynamicData[key] === 'frozenUntilDate' && !tokenContractDynamicData.isFrozen) {
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
                    className={classes.previewValueBlock}
                  >
                    <Box className={clsx(classes.previewLabel, classes.frozenUntil)}>
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
                  {`${getTokenAmount(totalTokenAmount, +tokenContract.decimals)} New`}
                </span>
              </Typography>
            )}
          </>
        );
      })}
    </Preview>
  );
};
