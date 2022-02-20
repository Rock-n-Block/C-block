import React, { VFC } from 'react';

import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { AlignHorizontally } from './YesNoBlock.types';
import { useStyles } from './YesNoBlock.styles';

export interface YesNoBlockProps {
  className?: string;
  yes: boolean;
  justify?: AlignHorizontally;
}

export const YesNoBlock: VFC<YesNoBlockProps> = ({ className, yes, justify = 'center' }) => {
  const classes = useStyles({ yes, justify });
  return (
    <Box className={clsx(classes.root, className)}>
      <Box className={classes.dot} />
      <Typography variant="body1">{yes ? 'YES' : 'NO'}</Typography>
    </Box>
  );
};
