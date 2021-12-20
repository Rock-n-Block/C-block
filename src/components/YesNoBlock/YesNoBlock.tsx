import React, { VFC } from 'react';

import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { useStyles } from './YesNoBlock.styles';

export interface YesNoBlockProps {
  yes: boolean;
  className?: string;
}

export const YesNoBlock: VFC<YesNoBlockProps> = ({ yes, className }) => {
  const classes = useStyles({ yes });
  return (
    <Box className={clsx(classes.root, className)}>
      <Box className={classes.dot} />
      <Typography variant="body1">{yes ? 'YES' : 'NO'}</Typography>
    </Box>
  );
};
