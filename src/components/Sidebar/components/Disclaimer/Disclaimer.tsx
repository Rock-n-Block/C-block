import React, { VFC } from 'react';
import { NavLink } from 'react-router-dom';

import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { routes } from 'appConstants';
import { useStyles } from './Disclaimer.styles';

export interface DisclaimerProps {
  className?: string;
}

export const Disclaimer: VFC<DisclaimerProps> = ({ className }) => {
  const classes = useStyles();
  return (
    <Box className={clsx(className, classes.root)}>
      <Typography variant="body1" className="xs">
        By using the service, you accept the{' '}
        <NavLink className={classes.link} to={routes['terms'].root}>Terms of Service</NavLink> |{' '}
        <NavLink className={classes.link} to={routes['privacy'].root}>Privacy Policy</NavLink>
      </Typography>
      <Typography>v1.0.0</Typography>
    </Box>
  );
};
