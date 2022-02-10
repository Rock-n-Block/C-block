import React, { FC } from 'react'; import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { InfoIcon } from 'theme/icons';

import { useStyles } from './EmptyTableBlock.styles';

export const EmptyTableBlock: FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <InfoIcon width="50" height="50" />
        <Typography className={clsx(classes.title, 'acidGreen')} variant="h3" align="center">
          There is no data in the table yet
        </Typography>
        <Typography className="l" variant="body1" align="center">
          Come back later
        </Typography>
      </Box>
    </Box>
  );
};
