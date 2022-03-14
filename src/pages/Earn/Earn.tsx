/* eslint-disable react/no-array-index-key */
import React, {
  FC, useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Box,
} from '@material-ui/core';

import { EmptyTableBlock } from 'components';
import { useWeb3Provider } from 'hooks';
import earnActions from 'store/earn/actions';
import { EarnListRow, EarnTable } from './components';
import {
  pageMainConfig,
} from './Earn.helpers';
import { useEarnData } from './Earn.hooks';
import { useStyles } from './Earn.styles';

export const Earn: FC = () => {
  const classes = useStyles();
  const {
    finishedContracts,
    hasTableData,
    getRowItemData,
    handleTransfer,
  } = useEarnData();

  const dispatch = useDispatch();
  const { getDefaultProvider } = useWeb3Provider();

  useEffect(() => {
    dispatch(earnActions.getFinishedContracts({
      provider: getDefaultProvider(),
    }));
  }, [dispatch, getDefaultProvider]);

  return (
    <Container className={classes.root}>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={6}>
          <Typography className="l" variant="body1">
            {pageMainConfig.description}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <EarnTable
            className={classes.tableContainer}
          />

          <Box className={classes.mobileTableData}>
            {
              hasTableData ? (
                finishedContracts.map((item, rowIndex) => {
                  const rowKey = JSON.stringify(item) + rowIndex;
                  const { deserializedRewardAmount } = getRowItemData(item);
                  return (
                    <EarnListRow
                      key={rowKey}
                      userAddress={item.address}
                      reward={deserializedRewardAmount}
                      onTransfer={() => handleTransfer(item)}
                    />
                  );
                })
              ) : (
                <EmptyTableBlock />
              )
            }
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
