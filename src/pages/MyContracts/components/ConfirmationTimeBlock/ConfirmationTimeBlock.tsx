import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { ClockIcon } from 'theme/icons';
import { useCountdownTimer } from 'hooks';
import { formatDateAsDDHHMM } from 'utils';
import { useStyles } from './ConfirmationTimeBlock.styles';
import { useStyles as useCommonStyles } from '../../MyContracts.styles';

export const ConfirmationTimeBlock: FC<{
  className?: string;
  countdownUntilTimestamp: number;
}> = ({ className, countdownUntilTimestamp }) => {
  const commonClasses = useCommonStyles();
  const classes = useStyles();

  const { secondsRemaining } = useCountdownTimer({
    startTime: Math.floor(Date.now() / 1000),
    endTime: countdownUntilTimestamp,
  });

  return (
    <Box className={className}>
      <Typography className={commonClasses.contractActionText}>
        Confirmation time
      </Typography>
      <Box className={classes.confirmationTimeBlockContent}>
        <ClockIcon />
        <Typography className={clsx('acidGreen')} variant="h2" component="div">
          {formatDateAsDDHHMM(secondsRemaining)}
        </Typography>
      </Box>
    </Box>
  );
};
