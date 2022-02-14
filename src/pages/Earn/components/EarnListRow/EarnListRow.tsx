import React, { FC, memo } from 'react';
import {
  Typography, Button, Box,
} from '@material-ui/core';

import { IColumn, tableConfig } from 'pages/Earn/Earn.helpers';
import { useStyles } from 'pages/Earn/Earn.styles';
import clsx from 'clsx';

type TEarnListRowProps = Partial<Record<IColumn['content'], string>> & {
  key?: string;
  onTransfer: () => void;
};

export const EarnListRow: FC<TEarnListRowProps> = memo(({
  userAddress, reward, onTransfer, ...props
}) => {
  const classes = useStyles();
  return (
    <Box {...props} className={classes.mobileListItem}>
      {tableConfig.bodyColumns.map(
        ({ content }, cellIndex) => {
          const { text: fieldLabel } = tableConfig.headColumns[cellIndex];
          const cellKey = fieldLabel + content + cellIndex;
          switch (content) {
            case 'userAddress': {
              return (
                <Box key={cellKey} className={classes.mobileListItemField}>
                  <Typography className={classes.headCell}>
                    {fieldLabel}
                  </Typography>
                  <Typography className={classes.cell}>
                    {userAddress}
                  </Typography>
                </Box>
              );
            }
            case 'reward': {
              return (
                <Box key={cellKey} className={classes.mobileListItemField}>
                  <Typography className={classes.headCell}>
                    {fieldLabel}
                  </Typography>
                  <Typography className={classes.cell}>
                    {reward}
                  </Typography>
                </Box>
              );
            }
            case 'transferButton': {
              return (
                <Box key={cellKey} className={classes.mobileListItemField}>
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
                </Box>
              );
            }
            default: {
              return null;
            }
          }
        },
      )}
    </Box>
  );
});
