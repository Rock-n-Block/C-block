/* eslint-disable react/no-array-index-key */
import React, {
  FC,
} from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
} from '@material-ui/core';

import { EmptyTableBlock } from 'components';
import { useDelayedTask } from 'hooks';
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
    getFinishedContracts,
  } = useEarnData();

  useDelayedTask(getFinishedContracts);

  return (
    <Container className={classes.root}>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={6}>
          <Typography className="l" variant="body1">
            {pageMainConfig.description}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          {
            hasTableData && (
              <EarnTable
                className={classes.tableContainer}
              />
            )
          }
          {
            !hasTableData && <EmptyTableBlock />
          }

          <Box className={classes.mobileTableData}>
            {
              hasTableData && (
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
              )
            }
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
