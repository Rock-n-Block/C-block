import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Grid, Typography, Box, Link,
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
import { DELETE_ME_DISABLED_TEXTFIELD } from './DELETE_ME_DISABLED_TEXTFIELD/DELETE_ME_DISABLED_TEXTFIELD';

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
    <>
      <Preview
        type="crowdsale"
        name={crowdsaleContract.contractName}
        launchAction={() => alert('launch')}
        editAction={handleEdit}
        deleteAction={handleDelete}
      >
        <Box className={classes.tokenAddressSection}>
          <Typography
            className={clsx(classes.sectionTitle, 'l')}
            variant="body1"
          >
            Token address
          </Typography>
          <DELETE_ME_DISABLED_TEXTFIELD
            className={classes.disabledInput}
            value={crowdsaleContract.tokenAddress}
          />
        </Box>

        <Box className={classes.mixedSection}>
          <Grid className={classes.tokenContractInfoBlock} container>
            {crowdsaleContract.tokens.map((crowdsaleContractDynamicData) => (
              <Grid
                item
                xs={6}
                sm={6}
                md={3}
                lg={3}
                xl={3}
              >
                {dynamicCrowdsaleContractPreviewHelpers.map(
                  ({ key, label }) => (
                    // eslint-disable-next-line implicit-arrow-linebreak
                    <Grid
                      key={key}
                      className={classes.previewValueBlock}
                    >
                      <Box
                        className={clsx(
                          classes.previewLabel,
                        )}
                      >
                        <Typography
                          className="s"
                          variant="body1"
                          color="textSecondary"
                        >
                          {label}
                        </Typography>
                      </Box>
                      <Typography variant="body1">
                        HARDCODE
                        <Typography
                          variant="body1"
                        >
                          {crowdsaleContractDynamicData[key]} <Link className={classes.tokenAddressLink} href={constructExplorerUrl(crowdsaleContractDynamicData.address)}>token</Link>
                        </Typography>
                      </Typography>
                    </Grid>
                  ),
                )}
              </Grid>
            ))}
          </Grid>
          {staticCrowdsaleContractPreviewHelpers.mixedSection.map((previewBlock, index) => (
            <Grid
              key={index.toString()}
              className={classes.tokenContractInfoBlock}
              container
            >
              {previewBlock.map(
                ({
                  key, label, valueLabel,
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
                        {crowdsaleContract[key]} {valueLabel}
                      </Typography>
                    ) : (
                      <YesNoBlock yes={crowdsaleContract[key]} />
                    )}
                  </Grid>
                ),
              )}
            </Grid>
          ))}
        </Box>

        <Box className={classes.mixMaxInvestmentsLimitationsSection}>
          <Typography
            className={clsx(classes.sectionTitle, 'l')}
            variant="body1"
          >
            Min & Max investments limitations
          </Typography>
          {staticCrowdsaleContractPreviewHelpers.minMaxInvestmentsSection.map((previewBlock, index) => (
            <Grid
              className={classes.tokenContractInfoBlock}
              key={index.toString()}
              container
            >
              {previewBlock.map(
                ({
                  key, label, valueLabel,
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
                    {typeof crowdsaleContract[key] !== 'boolean' ? (
                      <Typography variant="body1">
                        {crowdsaleContract[key]} {valueLabel}
                      </Typography>
                    ) : (
                      <YesNoBlock yes={crowdsaleContract[key]} />
                    )}
                  </Grid>
                ),
              )}
            </Grid>
          ))}
        </Box>

        <Box className={classes.amountBonusSection}>
          <Typography
            className={clsx(classes.sectionTitle, 'l')}
            variant="body1"
          >
            Amount Bonus
          </Typography>
          {staticCrowdsaleContractPreviewHelpers.amountBonusSection.map((previewBlock, index) => (
            <Grid
              className={classes.tokenContractInfoBlock}
              key={index.toString()}
              container
            >
              {previewBlock.map(
                ({
                  key, label, valueLabel,
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
                    {typeof crowdsaleContract[key] !== 'boolean' ? (
                      <Typography variant="body1">
                        {crowdsaleContract[key]} {valueLabel}
                      </Typography>
                    ) : (
                      <YesNoBlock yes={crowdsaleContract[key]} />
                    )}
                  </Grid>
                ),
              )}
            </Grid>
          ))}
        </Box>

        <Box className={classes.crowdsaleOwnerSection}>
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
            <Typography className={classes.copyableText}>
              {crowdsaleContract.crowdsaleOwner}
            </Typography>
          </Copyable>
        </Box>
      </Preview>
    </>
  );
};
