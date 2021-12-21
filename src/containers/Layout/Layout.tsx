import { UrlObject } from 'url';

import React, {
  FC, useCallback, useEffect, useState,
} from 'react';

import { Box } from '@material-ui/core';

import { Sidebar } from 'components/Sidebar';
import { Header } from 'containers';
import { useLocation } from 'react-router-dom';
import { useStyles } from './Layout.styles';

export interface LayoutProps {
  route?: UrlObject | string;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const classes = useStyles({ isSidebarOpen });

  const location = useLocation();
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <Box className={classes.root}>
      <Sidebar className={classes.sidebar} closeSidebar={toggleSidebar} />
      <span className={classes.content}>
        <Header openSidebar={toggleSidebar} />
        {children}
      </span>
      <Box className={classes.greenBlob} />
    </Box>
  );
};
