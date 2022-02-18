import React, {
  Fragment, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import Web3 from 'web3';

import {
  Preview, Copyable, FullscreenLoader, CompleteModal,
} from 'components';
import { useShallowSelector } from 'hooks';
import {
  ILostKeyContract, ILostKeyContractDynamicForm, RequestStatus, State, UserState,
} from 'types';
import { routes } from 'appConstants';
import contractFormsSelector from 'store/contractForms/selectors';
import uiSelector from 'store/ui/selectors';
import user from 'store/user/selectors';
import { deleteLostKeyContractForm } from 'store/contractForms/reducer';
import { getDeepValueByPath } from 'utils';
import { useWalletConnectorContext } from 'services';
import { createLostKeyContract } from 'store/contractForms/actions';
import actionTypes from 'store/contractForms/actionTypes';
import {
  staticLostKeyContractPreviewHelpers,
} from './LostKeyContractPreview.helpers';
import { useStyles } from './LostKeyContractPreview.styles';

export const LostKeyContractPreview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = useCallback(() => {
    dispatch(deleteLostKeyContractForm());
    navigate(routes.root);
  }, [dispatch, navigate]);
  const handleEdit = useCallback(() => {
    navigate(routes['lostkey-contract'].root);
  }, [navigate]);

  const { wallet } = useShallowSelector<State, UserState>(user.getUser);
  const { walletService } = useWalletConnectorContext();
  const handleCreateContract = useCallback(async () => {
    const { celo } = window;
    const web3 = new Web3(celo);
    dispatch(
      createLostKeyContract({
        // @ts-ignore
        provider: wallet === 'celo' ? web3 : walletService.Web3(),
      }),
    );
  }, [dispatch, wallet, walletService]);

  const lostKeyContract = useShallowSelector<State, ILostKeyContract>(
    contractFormsSelector.getLostKeyContract,
  );
  const createContractRequestStatus = useShallowSelector(
    uiSelector.getProp(actionTypes.CREATE_LOSTKEY_CONTRACT),
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

  return (
    <Preview
      type="lostkey"
      name={lostKeyContract.contractName}
      launchAction={handleCreateContract}
      editAction={handleEdit}
      deleteAction={handleDelete}
    >
      {staticLostKeyContractPreviewHelpers.map((sections) => (
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
                      ? sectionData.content<ILostKeyContractDynamicForm>(
                        lostKeyContract.reservesConfigs,
                      )
                      : sectionData.content
                  ).map(({
                    key, componentType, renderProps, dataFields,
                  }) => {
                    switch (componentType) {
                      case 'copyable': {
                        const value = getDeepValueByPath(lostKeyContract, key);
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
                                  .map((dataKeyField) => lostKeyContract[dataKeyField])
                                  .join(' ')
                                  .concat(renderProps.valueSuffix)
                              }
                            </Typography>
                          </Grid>
                        );
                      }
                      case 'singleHelperText': {
                        const value = getDeepValueByPath(lostKeyContract, key);
                        return (
                          <Grid key={key} className={classes.subInfo} item>
                            <Typography>{value}</Typography>
                          </Grid>
                        );
                      }
                      default: {
                        return (
                          <Grid key={key} className={classes.subInfo} item>
                            <Typography>
                              {
                                renderProps.sourceArray[renderProps.currentIdx][
                                  dataFields[0]
                                ]
                              }
                              %
                            </Typography>
                            <Typography>
                              {
                                renderProps.sourceArray[renderProps.currentIdx][
                                  dataFields[1]
                                ]
                              }
                            </Typography>
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
      {isLoader && <FullscreenLoader />}
      <CompleteModal
        open={resultModalState.open}
        result={resultModalState.result}
        onClose={handleCloseResultModal}
      />
    </Preview>
  );
};
