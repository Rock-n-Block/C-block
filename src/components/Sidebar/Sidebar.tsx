import React, { VFC } from 'react';
import { useLocation } from 'react-router-dom';

import { Box, IconButton } from '@material-ui/core';
import clsx from 'clsx';

import { AtIcon, CloseIcon } from 'theme/icons';
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
            isSelected={location.pathname.includes(link)}
            link={link}
            key={link}
          />
        ))}
        <a
          href="https://stackoverflow.com/questions/17492888/how-to-place-a-div-over-a-image"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SidebarTab
            Icon={AtIcon}
            label="Support"
            link=""
          />
        </a>
      </Box>
      <Box className={classes.contentWrapper}>
        <Disclaimer className={classes.sidebarDisclaimer} />
        <ThemeToggler />
      </Box>
    </Box>
  );
};
