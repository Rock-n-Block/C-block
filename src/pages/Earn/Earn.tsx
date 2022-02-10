/* eslint-disable react/no-array-index-key */
import React, {
  FC, useCallback, useMemo, useState,
} from 'react';
import {
  // Box,
  // Button,
  Container,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  // IconButton,
  // TextField,
  Typography,
  Button,
  Box,
} from '@material-ui/core';
import clsx from 'clsx';

import { EmptyTableBlock } from 'components';
import { useStyles } from './Earn.styles';
import {
  IRowData, mockPageData, pageMainConfig, tableConfig,
} from './Earn.helpers';

interface IMyTableProps {
  className?: string;
  rowsPerPage?: number;
  hasData: boolean;
  onTransfer: (item: IRowData) => void;
}

const MyTable: FC<IMyTableProps> = ({
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

  // const hasData = useMemo(() => !!mockPageData.length, []);

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
                  const cells = tableConfig.bodyColumns.map(({ text, renderProps, content }, cellIndex) => {
                    const cellProps = {
                      ...renderProps,
                      key: rowKey + text + content + cellIndex,
                    };
                    switch (content) {
                      case 'userAddress': {
                        return (
                          <TableCell {...cellProps}>
                            <Typography className={classes.cell}>{userAddress}</Typography>
                          </TableCell>
                        );
                      }
                      case 'reward': {
                        return (
                          <TableCell {...cellProps}>
                            <Typography className={classes.cell}>{reward}</Typography>
                          </TableCell>
                        );
                      }
                      case 'transferButton': {
                        return (
                          <TableCell {...cellProps}>
                            <Button
                              className={clsx(classes.button)}
                              variant="outlined"
                              size="medium"
                              onClick={() => handleTransfer(item)}
                            >
                              <Typography className="l" variant="body1" color="inherit">
                                Transfer
                              </Typography>
                            </Button>
                          </TableCell>
                        );
                      }
                      default: {
                        return (null);
                      }
                    }
                  });
                  return (
                    <TableRow key={rowKey}>
                      {cells}
                    </TableRow>
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

export const Earn: FC = () => {
  const classes = useStyles();
  const hasTableData = useMemo(() => !!mockPageData.length, []);
  const handleTransfer = useCallback((item: IRowData) => {
    console.log(item);
  }, []);

  return (
    <Container className={classes.root}>
      {/* <SetUpModal open={isSetUpModalOpen} setIsSetUpModalOpen={setIsSetUpModalOpen} /> */}
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={6}>
          <Typography className="l" variant="body1">
            {pageMainConfig.description}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <MyTable className={classes.tableContainer} hasData={hasTableData} onTransfer={handleTransfer} />

          <Box className={classes.mobileTableData}>
            {
              hasTableData ? (
                <Box>
                  2
                </Box>
              ) : (
                <EmptyTableBlock />
              )
            }
          </Box>
        </Grid>

        {/* {filteredCards.map(({
          contractName,
          contractDate,
          contractType,
          contractLogo,
          contractButtons,
          isRequestBlockActive,
          contractKey,
        }) => (
          <Box
            key={contractKey}
            className={classes.contractBlock}
          >
            <Box className={classes.contractHead}>
              <Typography color="textSecondary">{contractType}</Typography>
              <NetTag className={classes.chainTag} isTestnet={!isMainnet} />
            </Box>
            <Typography className={classes.contractDate} color="textSecondary">{contractDate}</Typography>

            <Box className={classes.contractTitle}>
              <IconButton>{contractLogo}</IconButton>
              <Typography variant="h3">{contractName}</Typography>
            </Box>
            {isRequestBlockActive && (
            <Box className={classes.contractActionBlock}>
              <Typography className={classes.contractActionText}>Request divorce</Typography>
              <Box>
                <Button className={clsx(classes.button, classes.actionButton)} variant="outlined">Approve divorce</Button>
                <Button className={clsx(classes.button, classes.actionButton)} variant="outlined">Reject divorce</Button>
              </Box>
            </Box>
            )}
            <Box className={classes.contractBottom}>
              <Box className={classes.contractButtons}>
                {contractButtons.map(({
                  type, title,
                }, index) => (
                  <Button
                    onClick={() => buttonClickHandler(contractKey, type)}
                    className={classes.button}
                    value={type}
                    key={`${type}_${index}`}
                    variant="outlined"
                  >{title}
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>
        ))} */}
      </Grid>
    </Container>
  );
};
