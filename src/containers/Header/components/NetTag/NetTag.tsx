import React, { VFC } from 'react';

import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { useStyles } from './NetTag.styles';

export interface ConnectButtonProps {
  isTestnet: boolean;
  className?: string;
}

export const NetTag: VFC<ConnectButtonProps> = ({ isTestnet, className }) => {
  const classes = useStyles({ isTestnet });
  return (
    <div className={clsx(classes.root, className)}>
      <Box className={classes.dot} />
      <Typography
        variant="body1"
        className={clsx(classes.text, 'xs')}
      >
        {isTestnet ? 'Alfajores Testnet' : 'Celo mainnet'}
      </Typography>
    </div>
  );
};
