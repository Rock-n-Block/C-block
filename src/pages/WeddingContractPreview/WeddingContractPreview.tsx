/* eslint-disable react/no-array-index-key */
import React, { Fragment, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Grid, Typography } from '@material-ui/core';

import { Preview, Copyable } from 'components';
import { useWeb3Provider, useShallowSelector } from 'hooks';
import {
  TPreviewContractNavigationState, IWeddingContract,
} from 'types';
import { routes } from 'appConstants';
import contractFormsSelector from 'store/contractForms/selectors';
import { deleteWeddingContractForm } from 'store/contractForms/reducer';
import { createWeddingContract } from 'store/contractForms/actions';
import { staticWeddingContractPreviewHelpers } from './WeddingContractPreview.helpers';
import { useStyles } from './WeddingContractPreview.styles';

export const WeddingContractPreview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getDefaultProvider } = useWeb3Provider();
  const handleDelete = useCallback(() => {
    dispatch(deleteWeddingContractForm());
    navigate(routes.root);
  }, [dispatch, navigate]);
  const handleEdit = useCallback(() => {
    navigate(routes['wedding-contract'].root);
  }, [navigate]);

  const handleCreateContract = useCallback(async () => {
    dispatch(
      createWeddingContract({
        provider: getDefaultProvider(),
      }),
    );
  }, [dispatch, getDefaultProvider]);

  const { state }: { state: TPreviewContractNavigationState } = useLocation();
  const weddingContractFromStore = useShallowSelector(contractFormsSelector.getWeddingContract);
  const weddingContract = useMemo(
    () => state?.contractPreview?.data as IWeddingContract || weddingContractFromStore,
    [state?.contractPreview?.data, weddingContractFromStore],
  );

  const classes = useStyles();

  return (
    <Preview
      type="weddingRing"
      name={weddingContract.contractName}
      launchAction={handleCreateContract}
      editAction={handleEdit}
      deleteAction={handleDelete}
      isReadonly={state?.contractPreview?.isReadonly}
    >
      {staticWeddingContractPreviewHelpers.map((previewBlock, index) => (
        <Box className={classes.tokenContractInfoBlock} key={index}>
          {previewBlock.map(({
            key, label, name, partnerEmailKey, partnerSliderValueKey, bottomInfo,
          }) => (
            <Fragment key={label}>
              <Typography className={classes.contractNameTitle}>{label}</Typography>
              <Copyable
                key={key}
                onlyIconActive
                withBorder
                valueToCopy={weddingContract[name]}
                className={classes.copyableContainer}
              >
                <Typography noWrap>
                  {weddingContract[name]}
                </Typography>
              </Copyable>
              <Box className={classes.subInfo}>
                <Typography>{weddingContract[partnerSliderValueKey]}%</Typography>
                <Typography>{weddingContract[partnerEmailKey]}</Typography>
              </Box>
              {bottomInfo && (
                <Grid item xs={12} sm={12} md={8} lg={8} xl={6} className={classes.approvalInfo}>
                  {bottomInfo.map(({ title, daysKey }) => (
                    <Box key={daysKey} className={classes.approvalInfoBlock}>
                      <Typography color="textSecondary">{title}</Typography>
                      <Typography>{weddingContract[daysKey]} days</Typography>
                    </Box>
                  ))}
                </Grid>
              )}
            </Fragment>
          ))}
        </Box>
      ))}
    </Preview>
  );
};
