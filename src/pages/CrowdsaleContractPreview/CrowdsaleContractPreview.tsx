import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, Typography, Box } from '@material-ui/core';

import { Preview, YesNoBlock, Copyable } from 'components';
import { useShallowSelector } from 'hooks';
import contractFormsSelector from 'store/contractForms/selectors';
import { ContractFormsState, State } from 'types';
import clsx from 'clsx';
import { routes } from 'appConstants';

import { deleteTokenContractForm } from 'store/contractForms/reducer';
import { useStyles } from './CrowdsaleContractPreview.styles';
import {
  dynamicTokenContractPreviewHelpers,
  staticTokenContractPreviewHelpers,
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
    <>
      <Preview
        type="crowdsale"
        name={crowdsaleContract.contractName}
        launchAction={() => alert('launch')}
        editAction={handleEdit}
        deleteAction={handleDelete}
      >
        {staticTokenContractPreviewHelpers.map((previewBlock, index) => (
          <Grid
            container
            className={classes.tokenContractInfoBlock}
            key={index.toString()}
          >
            {previewBlock.map(
              ({
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
                  {typeof crowdsaleContract[key] !== 'boolean' ? (
                    <Typography variant="body1">
                      {shouldSkipObjectValue ? value : crowdsaleContract[key]}
                    </Typography>
                  ) : (
                    <YesNoBlock yes={crowdsaleContract[key]} />
                  )}
                </Grid>
              ),
            )}
          </Grid>
        ))}

        <Typography
          className={clsx(classes.tokenOwnerTitle, 'l')}
          variant="body1"
        >
          Token Owner
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
        <Typography className={classes.dynamicDataHeader} variant="h3">
          Token distribution
        </Typography>
        {crowdsaleContract.tokens.map((crowdsaleContractDynamicData) => (
          <>
            <Typography
              className={clsx(classes.previewLabel, 's')}
              variant="body1"
              color="textSecondary"
            >
              Address:
            </Typography>
            <Copyable
              className={classes.copyableContainer}
              onlyIconActive
              withBorder
              valueToCopy={crowdsaleContractDynamicData.address}
            >
              <Typography className={classes.copyableText}>
                {crowdsaleContractDynamicData.address}
              </Typography>
            </Copyable>
            <Grid container className={classes.nameAmountData}>
              {dynamicTokenContractPreviewHelpers.map(
                ({ icon, key, label }) =>
                // if (
                //   crowdsaleContractDynamicData[key] === 'frozenUntilDate' &&
                //   !crowdsaleContractDynamicData.isFrozen
                // ) {
                //   return null;
                // }

                  // eslint-disable-next-line implicit-arrow-linebreak
                  (
                    <Grid
                      className={classes.previewValueBlock}
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
                          className="s"
                          variant="body1"
                          color="textSecondary"
                        >
                          {label}
                        </Typography>
                      </Box>
                      <Typography variant="body1">
                        {crowdsaleContractDynamicData[key]}
                      </Typography>
                    </Grid>
                  )
                ,
              )}
            </Grid>
          </>
        ))}
      </Preview>
    </>
  );
};
