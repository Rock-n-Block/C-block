import React, { useCallback, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Switch, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { MoonIcon, SunIcon } from 'theme/icons';
import { toggleTheme } from 'store/user/reducer';
import userSelector from 'store/user/selectors';
import { useShallowSelector } from 'hooks';
import { State, UserState } from 'types';
import { useStyles } from './ThemeToggler.styles';

export interface ThemeTogglerProps {
  className?: string;
}

export const ThemeToggler: VFC<ThemeTogglerProps> = ({ className }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLight } = useShallowSelector<State, UserState>(
    userSelector.getUser,
  );

  const changeTheme = useCallback(() => {
    dispatch(toggleTheme());
  }, []);

  return (
    <Box className={clsx(className, classes.root)}>
      <Box className={classes.leftSide}>
        {!isLight ? <MoonIcon /> : <SunIcon />}
        <Typography className={classes.text}>{`${isLight ? 'Light' : 'Dark'} Mode`}</Typography>
      </Box>
      <Switch size="small" checked={isLight} onClick={changeTheme} />
    </Box>
  );
};
