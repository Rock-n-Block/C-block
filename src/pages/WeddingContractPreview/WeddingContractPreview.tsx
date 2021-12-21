/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import { Preview } from 'components/Preview';
import { useShallowSelector } from 'hooks';
import { ContractFormsState, State } from 'types';
import { Box, Grid, Typography } from '@material-ui/core';
import { Copyable } from 'components/Copyable';
import { routes } from 'appConstants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteTokenContractForm } from 'store/contractForms/reducer';
import { useStyles } from './WeddingContractPreview.styles';
import {
  staticWeddingContractPreviewHelpers,
} from './WeddingContractPreview.helpers';
import contractFormsSelector from '../../store/contractForms/selectors';

const WeddingContractPreview = () => {
  const {
    weddingContract,
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
    <>
      <Preview
        type="weddingRing"
        name={weddingContract.contractName}
        launchAction={() => alert('launch')}
        editAction={handleEdit}
        deleteAction={handleDelete}
      >
        {staticWeddingContractPreviewHelpers.map((previewBlock, index) => (
          <Grid container className={classes.tokenContractInfoBlock} key={index}>
            {previewBlock.map(({
              key, label, name, partnerEmailKey, partnerSliderValueKey, bottomInfo,
            }) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                key={label}
                className={classes.previewValueBlock}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={10}
                  xl={10}
                  className={classes.previewValueItem}
                >
                  <Typography className={classes.contractNameTitle}>{label}</Typography>
                  <Copyable
                    key={key}
                    onlyIconActive
                    withBorder
                    valueToCopy={weddingContract[name]}
                    className={classes.copyableContainer}
                  >
                    <Typography
                      className={classes.copyableText}
                    >
                      {weddingContract[name]}
                    </Typography>
                  </Copyable>
                  <Box className={classes.subInfo}>
                    <Typography>{weddingContract[partnerSliderValueKey]}%</Typography>
                    <Typography>{weddingContract[partnerEmailKey]}</Typography>
                  </Box>
                  {bottomInfo && (
                  <Grid item xl={6} lg={8} md={8} xs={12} sm={12} className={classes.approvalInfo}>
                    {bottomInfo.map(({ title, daysKey }) => (
                      <Box>
                        <Typography color="textSecondary">{title}</Typography>
                        <Typography>{weddingContract[daysKey]} days</Typography>
                      </Box>
                    ))}
                  </Grid>
                  )}
                </Grid>
              </Grid>
            ))}
          </Grid>
        ))}
      </Preview>
    </>
  );
};

export default WeddingContractPreview;
