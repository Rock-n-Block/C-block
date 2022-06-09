import React, { VFC } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, IconButton } from '@material-ui/core';
import clsx from 'clsx';

import { CloseIcon } from 'theme/icons';
import { useShallowSelector } from 'hooks';
import userSelector from 'store/user/selectors';
import { navigationTabs } from './SideBar.helpers';
import { Logo } from '../Logo';
import { Disclaimer, SidebarTab, ThemeToggler } from './components';
import { useStyles } from './Sidebar.styles';

export interface SidebarProps {
  className?: string;
  closeSidebar: () => void;
}

export const Sidebar: VFC<SidebarProps> = ({ closeSidebar, className }) => {
  const classes = useStyles();
  const location = useLocation();

  const { isLight } = useShallowSelector(userSelector.getUser);
  const isAuthenticated = useShallowSelector(userSelector.selectIsAuthenticated);
  return (
    <Box className={clsx(classes.root, className)}>
      <Box className={classes.contentWrapper}>
        <Box className={classes.sidebarHead}>
          <Logo isLight={isLight} />
          <IconButton
            onClick={closeSidebar}
            color="primary"
            className={classes.sidebarCloseBtn}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {navigationTabs.map(({
          Icon, label, link, isExternal,
        }) => {
          if (label === 'My contracts' && !isAuthenticated) return null;
          return (
            <SidebarTab
              key={link}
              Icon={Icon}
              label={label}
              isSelected={location.pathname.includes(link)}
              to={link}
              isExternal={isExternal}
            />
          );
        })}
      </Box>
      <Box className={classes.contentWrapper}>
        <Disclaimer className={classes.sidebarDisclaimer} />
        <ThemeToggler />
      </Box>
    </Box>
  );
};
