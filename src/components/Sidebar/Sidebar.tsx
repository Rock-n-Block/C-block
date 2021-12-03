import React, { VFC } from 'react';

import { Box, IconButton } from '@material-ui/core';
import clsx from 'clsx';

import { useLocation } from 'react-router-dom';
import { CloseIcon } from 'theme/icons';
import { State, UserState } from 'types';
import { useShallowSelector } from 'hooks';
import userSelector from 'store/user/selectors';
import { useStyles } from './Sidebar.styles';
import { navigationTabs } from './SideBar.helpers';
import { Logo } from '../Logo';
import { Disclaimer } from './components/Disclaimer';
import { SidebarTab } from './components/SidebarTab';
import { ThemeToggler } from './components/ThemeToggler';

export interface SidebarProps {
  closeSidebar: () => void;
  className?: string;
}

export const Sidebar: VFC<SidebarProps> = ({ closeSidebar, className }) => {
  const classes = useStyles();
  const location = useLocation();

  const { isLight } = useShallowSelector<State, UserState>(userSelector.getUser);
  return (
    <Box className={clsx(classes.root, className)}>
      <Box className={classes.contentWrapper}>
        <Box className={classes.sidebarHead}>
          <Logo isLight={isLight} />
          <IconButton onClick={closeSidebar} color="primary" className={classes.sidebarCloseBtn}>
            <CloseIcon />
          </IconButton>
        </Box>
        {navigationTabs.map(({ Icon, label, link }) => (
          <SidebarTab
            Icon={Icon}
            label={label}
            isSelected={location.pathname === link}
            link={link}
            key={link}
          />
        ))}
      </Box>
      <Box className={classes.contentWrapper}>
        <Disclaimer className={classes.sidebarDisclaimer} />
        <ThemeToggler />
      </Box>
    </Box>
  );
};
