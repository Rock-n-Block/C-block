/* eslint-disable react/no-array-index-key */
import React, { Fragment, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Grid, Typography, Box, Link, TextField,
} from '@material-ui/core';

import { Preview, YesNoBlock, Copyable } from 'components';
import { useShallowSelector } from 'hooks';
import contractFormsSelector from 'store/contractForms/selectors';
import { ContractFormsState, State } from 'types';
import clsx from 'clsx';
import { routes } from 'appConstants';
import { deleteTokenContractForm } from 'store/contractForms/reducer';
import { constructExplorerUrl } from 'utils';
import { useStyles } from './CrowdsaleContractPreview.styles';
import {
  dynamicCrowdsaleContractPreviewHelpers,
  staticCrowdsaleContractPreviewHelpers,
} from './CrowdsaleContractPreview.helpers';

export const CrowdsaleContractPreview = () => {
  const { crowdsaleContract } = useShallowSelector<State, ContractFormsState>(
    contractFormsSelector.getContractForms,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = useCallback(() => {
    navigate(routes['crowdsale-contract'].root);
  }, []);

  const handleDelete = useCallback(() => {
    dispatch(deleteTokenContractForm());
    navigate(routes.root);
  }, []);

  const classes = useStyles();
  return (
    <Preview
      type="crowdsale"
      name={crowdsaleContract.contractName}
      launchAction={() => alert('launch')}
      editAction={handleEdit}
      deleteAction={handleDelete}
    >
      <Box paddingTop={2} paddingBottom={2}>
        <Typography
          className={clsx(classes.sectionTitle, 'l')}
          variant="body1"
        >
          Token address
        </Typography>
        <TextField
          className={classes.disabledInput}
          disabled
          value={crowdsaleContract.tokenAddress}
        />
      </Box>

      <Box
        className={classes.mixedSection}
        paddingTop={4}
        paddingBottom={4}
        paddingLeft={3}
        paddingRight={3}
        marginLeft={-3}
        marginRight={-3}
      >
        <Grid className={classes.tokenContractInfoBlock} container>
          {crowdsaleContract.tokens.map((crowdsaleContractDynamicData) => (
            <Grid
              className={classes.previewValueBlock}
              item
              xs={6}
              sm={6}
              md={3}
              lg={3}
              xl={3}
            >
              {dynamicCrowdsaleContractPreviewHelpers.map(
                ({ key, label }) => (
                  <Fragment
                    key={key}
                  >
                    <Typography
                      className={clsx(
                        classes.previewLabel,
                        's',
                      )}
                      variant="body1"
                      color="textSecondary"
                    >
                      {label}
                    </Typography>
                    <Typography variant="body1">
                      HARDCODE
                    </Typography>
                    <Typography variant="body1">
                      {crowdsaleContractDynamicData[key]} <Link className={classes.tokenAddressLink} href={constructExplorerUrl(crowdsaleContractDynamicData.address)}>token</Link>
                    </Typography>
                  </Fragment>
                ),
              )}
            </Grid>
          ))}
        </Grid>
        {staticCrowdsaleContractPreviewHelpers.mixedSection.map((previewBlock, index) => (
          <Grid
            key={index}
            className={classes.tokenContractInfoBlock}
            container
          >
            {previewBlock.map(
              ({
                key, label, valueSuffix,
              }) => (
                <Grid
                  key={label}
                  className={classes.previewValueBlock}
                  item
                  xs={6}
                  sm={6}
                  md={3}
                  lg={3}
                  xl={3}
                >
                  <Typography
                    variant="body1"
                    className={clsx(classes.previewLabel, 's')}
                    color="textSecondary"
                  >
                    {label}
                  </Typography>
                  {typeof crowdsaleContract[key] !== 'boolean' ? (
                    <Typography variant="body1">
                      {crowdsaleContract[key]} {valueSuffix}
                    </Typography>
                  ) : (
                    <YesNoBlock yes={crowdsaleContract[key]} justify="normal" />
                  )}
                </Grid>
              ),
            )}
          </Grid>
        ))}
      </Box>

      <Box className={classes.borderedSection} paddingTop={5} paddingBottom={5}>
        <Typography
          className={clsx(classes.sectionTitle, 'l')}
          variant="body1"
        >
          Min & Max investments limitations
        </Typography>
        {staticCrowdsaleContractPreviewHelpers.minMaxInvestmentsSection.map((previewBlock, index) => (
          <Grid
            className={classes.tokenContractInfoBlock}
            key={index}
            container
          >
            {previewBlock.map(
              ({
                key, label, valueSuffix,
              }) => (
                <Grid
                  key={label}
                  className={classes.previewValueBlock}
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                >
                  <Typography
                    variant="body1"
                    className={clsx(classes.previewLabel, 's')}
                    color="textSecondary"
                  >
                    {label}
                  </Typography>
                  <Typography variant="body1">
                    {crowdsaleContract[key]} {valueSuffix}
                  </Typography>
                </Grid>
              ),
            )}
          </Grid>
        ))}
      </Box>

      <Box className={classes.borderedSection} paddingTop={2} paddingBottom={3}>
        <Typography
          className={clsx(classes.sectionTitle, 'l')}
          variant="body1"
        >
          Amount Bonus
        </Typography>
        {staticCrowdsaleContractPreviewHelpers.amountBonusSection.map((previewBlock, index) => (
          <Grid
            className={classes.tokenContractInfoBlock}
            key={index}
            container
          >
            {previewBlock.map(
              ({
                key, label, valueSuffix,
              }) => (
                <Grid
                  key={label}
                  className={classes.previewValueBlock}
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                >
                  <Typography
                    variant="body1"
                    className={clsx(classes.previewLabel, 's')}
                    color="textSecondary"
                  >
                    {label}
                  </Typography>
                  <Typography variant="body1">
                    {crowdsaleContract[key]} {valueSuffix}
                  </Typography>
                </Grid>
              ),
            )}
          </Grid>
        ))}
      </Box>

      <Box paddingTop={3} paddingBottom={3}>
        <Typography
          className={clsx(classes.sectionTitle, 'l')}
          variant="body1"
        >
          Crowdsale Owner
        </Typography>
        <Copyable
          className={classes.copyableContainer}
          onlyIconActive
          withBorder
          valueToCopy={crowdsaleContract.crowdsaleOwner}
        >
          <Typography noWrap>
            {crowdsaleContract.crowdsaleOwner}
          </Typography>
        </Copyable>
      </Box>
    </Preview>
  );
};
