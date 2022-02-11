import React, { FC } from 'react';
import {
  Box,
} from '@material-ui/core';
import { useStyles } from './AdditionalContent.styles';

export const AdditionalContent: FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Box className={classes.contractActionBlock}>
      {children}
    </Box>
  );
};
