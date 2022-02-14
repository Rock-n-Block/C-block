/* eslint-disable react/no-array-index-key */
import React, {
  FC, useCallback, useMemo,
} from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
} from '@material-ui/core';

import { EmptyTableBlock } from 'components';
import { EarnListRow, EarnTable } from './components';
import {
  IRowData, mockPageData, pageMainConfig,
} from './Earn.helpers';
import { useStyles } from './Earn.styles';

export const Earn: FC = () => {
  const classes = useStyles();
  const hasTableData = useMemo(() => !!mockPageData.length, []);
  const handleTransfer = useCallback((item: IRowData) => {
    console.log(item);
  }, []);

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
            hasData={hasTableData}
            onTransfer={handleTransfer}
          />

          <Box className={classes.mobileTableData}>
            {
              hasTableData ? (
                mockPageData.map((item, rowIndex) => {
                  const rowKey = JSON.stringify(item) + rowIndex;
                  const { userAddress, reward } = item;

                  return (
                    <EarnListRow
                      key={rowKey}
                      userAddress={userAddress}
                      reward={reward.toString()}
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
