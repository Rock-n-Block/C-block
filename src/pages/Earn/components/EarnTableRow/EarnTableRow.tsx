import React, { FC, memo } from 'react';
import {
  TableRow, TableCell, Typography, Button,
} from '@material-ui/core';

import { IColumn, tableConfig } from 'pages/Earn/Earn.helpers';
import { useStyles } from 'pages/Earn/Earn.styles';
import clsx from 'clsx';

type TEarnTableRowProps = Partial<Record<IColumn['content'], string>> & {
  key?: string;
  onTransfer: () => void;
};

export const EarnTableRow: FC<TEarnTableRowProps> = memo(({
  userAddress,
  reward,
  onTransfer,
  ...props
}) => {
  const classes = useStyles();

  return (
    <TableRow {...props}>
      {tableConfig.bodyColumns.map(
        ({ text, renderProps, content }, cellIndex) => {
          const cellProps = {
            ...renderProps,
            key: text + content + cellIndex,
          };
          switch (content) {
            case 'userAddress': {
              return (
                <TableCell {...cellProps}>
                  <Typography className={classes.cell}>
                    {userAddress}
                  </Typography>
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
                    onClick={onTransfer}
                  >
                    <Typography className="l" variant="body1" color="inherit">
                      Transfer
                    </Typography>
                  </Button>
                </TableCell>
              );
            }
            default: {
              return null;
            }
          }
        },
      )}
    </TableRow>
  );
});
