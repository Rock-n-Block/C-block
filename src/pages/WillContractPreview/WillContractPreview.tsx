import React, { Fragment, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { Preview, Copyable } from 'components';
import { useShallowSelector } from 'hooks';
import { ContractFormsState, IWillContractDynamicForm, State } from 'types';
import { routes } from 'appConstants';
import contractFormsSelector from 'store/contractForms/selectors';
import { deleteWillContractForm } from 'store/contractForms/reducer';
import { getDeepValueByPath } from 'utils';
import {
  staticWillContractPreviewHelpers,
} from './WillContractPreview.helpers';
import { useStyles } from './WillContractPreview.styles';

export const WillContractPreview = () => {
  const {
    willContract,
  } = useShallowSelector<State, ContractFormsState>(contractFormsSelector.getContractForms);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = useCallback(() => {
    navigate(routes['will-contract'].root);
  }, [navigate]);

  const handleDelete = useCallback(() => {
    dispatch(deleteWillContractForm());
    navigate(routes.root);
  }, [dispatch, navigate]);

  const classes = useStyles();

  return (
    <Preview
      type="will"
      name={willContract.contractName}
      launchAction={() => console.log('launch')}
      editAction={handleEdit}
      deleteAction={handleDelete}
    >
      {staticWillContractPreviewHelpers.map((sections) => (
        <Box key={JSON.stringify(sections)} className={classes.section}>
          {sections.map((sectionData) => (
            <Fragment key={sectionData.key}>
              <Typography
                className={clsx(classes.sectionTitle, 'l')}
                variant="body1"
              >{sectionData.title}
              </Typography>
              <Grid container>
                {
                  (
                    typeof sectionData.content === 'function'
                      ? sectionData.content<IWillContractDynamicForm>(
                        willContract.reservesConfigs,
                      )
                      : sectionData.content
                  ).map(({
                    key, componentType, renderProps, dataFields,
                  }) => {
                    switch (componentType) {
                      case 'copyable': {
                        const value = getDeepValueByPath(willContract, key);
                        return (
                          <Grid key={key} item xs={12}>
                            <Copyable
                              className={classes.copyableContainer}
                              onlyIconActive
                              withBorder
                              valueToCopy={value}
                            >
                              <Typography noWrap>{value}</Typography>
                            </Copyable>
                          </Grid>
                        );
                      }
                      case 'tableColumn': {
                        return (
                          <Grid key={key} className={classes.tableColumn} item sm={4}>
                            <Typography
                              className={classes.tableColumnTitle}
                              color="textSecondary"
                            >{renderProps.header}
                            </Typography>
                            <Typography>
                              {
                                dataFields
                                  .map((dataKeyField) => willContract[dataKeyField])
                                  .join(' ')
                                  .concat(renderProps.valueSuffix)
                              }
                            </Typography>
                          </Grid>
                        );
                      }
                      default: {
                        return (
                          <Grid key={key} className={classes.subInfo} item>
                            <Typography>{renderProps.sourceArray[renderProps.currentIdx][dataFields[0]]}%</Typography>
                            <Typography>{renderProps.sourceArray[renderProps.currentIdx][dataFields[1]]}</Typography>
                          </Grid>
                        );
                      }
                    }
                  })
                }
              </Grid>
            </Fragment>
          ))}
        </Box>
      ))}
    </Preview>
  );
};
