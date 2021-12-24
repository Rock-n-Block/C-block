import React, { VFC } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

import { routes } from 'appConstants';
import { LogoBlackIcon, LogoIcon } from 'assets/img';
import { useStyles } from './Logo.styles';

export interface LogoProps {
  isLight?: boolean;
  className?: string;
}

export const Logo: VFC<LogoProps> = ({ isLight = false, className }) => {
  const classes = useStyles();
  return (
    <Link to={routes.root} className={clsx(classes.root, className)}>
      <img src={isLight ? LogoBlackIcon : LogoIcon} alt="" />
      <Typography variant="body1" className={classes.subLogo}>Platform</Typography>
    </Link>
  );
};
