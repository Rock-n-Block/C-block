import React, { FC } from 'react';
import {
  Box, Typography,
} from '@material-ui/core';
import clsx from 'clsx';

import { ClockIcon } from 'theme/icons';
import { useStyles } from './ConfirmationTimeBlock.styles';
import { useStyles as useCommonStyles } from '../../MyContracts.styles';

export const ConfirmationTimeBlock: FC<{ className?: string }> = ({ className }) => {
  const commonClasses = useCommonStyles();
  const classes = useStyles();
  return (
    <Box className={className}>
      <Typography className={commonClasses.contractActionText}>Сonfirmation time</Typography>
      <Box className={classes.confirmationTimeBlockContent}>
        <ClockIcon />
        <Typography className={clsx('acidGreen')} variant="h2" component="div">23d 24h 43m</Typography>
      </Box>
    </Box>
  );
};
