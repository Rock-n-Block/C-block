/* eslint-disable react/no-array-index-key */
import React, {
  FC, useCallback, useState,
} from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  Typography,
} from '@material-ui/core';

import { EmptyTableBlock } from 'components';
import { EarnTableRow } from 'pages/Earn/components/EarnTableRow';
import {
  tableConfig,
} from 'pages/Earn/Earn.helpers';
import { useStyles } from 'pages/Earn/Earn.styles';
import { useEarnData } from 'pages/Earn/Earn.hooks';

interface IEarnTableProps {
  className?: string;
  rowsPerPage?: number;
}

export const EarnTable: FC<IEarnTableProps> = ({
  className, rowsPerPage = 5,
}) => {
  const classes = useStyles();
  const {
    finishedContracts,
    hasTableData,
    getRowItemData,
    handleTransfer,
  } = useEarnData();
  const [currentPage, setCurrentPage] = useState(0);

  const handleChangePage = useCallback((event, newPage) => {
    setCurrentPage(newPage);
  }, []);

  return (
    <TableContainer className={className}>
      <Table>
        <TableHead>
          <TableRow>
            {
              tableConfig.headColumns.map(({ text, renderProps, content }, index) => (
                <TableCell key={text + content + index} {...renderProps}>
                  <Typography className={classes.headCell} variant="body1">
                    {text || content}
                  </Typography>
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        {
          hasTableData ? (
            <TableBody>
              {
                finishedContracts
                  .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                  .map((item, rowIndex) => {
                    const rowKey = JSON.stringify(item) + rowIndex;
                    const { deserializedRewardAmount } = getRowItemData(item);
                    return (
                      <EarnTableRow
                        key={rowKey}
                        userAddress={item.address}
                        reward={deserializedRewardAmount}
                        onTransfer={() => handleTransfer(item)}
                      />
                    );
                  })
              }
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={tableConfig.headColumns.length}>
                  <EmptyTableBlock />
                </TableCell>
              </TableRow>
            </TableBody>
          )
        }
        {
          hasTableData && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[]}
                  count={finishedContracts.length}
                  rowsPerPage={rowsPerPage}
                  page={currentPage}
                  onPageChange={handleChangePage}
                />
              </TableRow>
            </TableFooter>
          )
        }
      </Table>
    </TableContainer>
  );
};
