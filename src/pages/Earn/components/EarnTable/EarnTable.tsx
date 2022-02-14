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
import { EarnTableRow } from 'pages/Earn/components';
import {
  IRowData, mockPageData, tableConfig,
} from 'pages/Earn/Earn.helpers';
import { useStyles } from 'pages/Earn/Earn.styles';

interface IEarnTableProps {
  className?: string;
  rowsPerPage?: number;
  hasData: boolean;
  onTransfer: (item: IRowData) => void;
}

export const EarnTable: FC<IEarnTableProps> = ({
  className, hasData, rowsPerPage = 5, onTransfer,
}) => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(0);

  const handleChangePage = useCallback((event, newPage) => {
    setCurrentPage(newPage);
  }, []);

  const handleTransfer = (item: IRowData) => {
    onTransfer(item);
  };

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
          hasData ? (
            <TableBody>
              {
                mockPageData
                  .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                  .map((item, rowIndex) => {
                    const rowKey = JSON.stringify(item) + rowIndex;
                    const { userAddress, reward } = item;

                    return (
                      <EarnTableRow
                        key={rowKey}
                        userAddress={userAddress}
                        reward={reward.toString()}
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
          hasData && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[]}
                  count={mockPageData.length}
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
