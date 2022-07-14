import { UrlObject } from 'url';

import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@material-ui/core';

import { GreenGlobImg } from 'assets';
import userSelector from 'store/user/selectors';
import { COLOR_BLACK_8, COLOR_GREY_9 } from 'theme/colors';
import { Sidebar } from 'components/Sidebar';
import { Header } from 'containers';
import { useParticleNetwork, useShallowSelector } from 'hooks';
import { routes } from 'appConstants';
import { setNotification } from 'utils';
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

  const { isLight } = useShallowSelector(userSelector.getUser);

  const { particleCanvasRef } = useParticleNetwork({
    background: isLight ? COLOR_GREY_9 : COLOR_BLACK_8,
  });

  const isAuthenticated = useShallowSelector(userSelector.selectIsAuthenticated);
  const profile = useShallowSelector(userSelector.selectProfile);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) return;
    if (!profile.isCompletedProfile) {
      navigate(routes.profile.root);
      setNotification({ type: 'info', message: 'You must fill all profile fields in order to complete registration' });
    }
  }, [isAuthenticated, location.pathname, profile.isCompletedProfile]);

  return (
    <Box className={classes.root}>
      <Box
        // @ts-expect-error @see https://github.com/mui/material-ui/issues/17010
        ref={particleCanvasRef}
        className={classes.particleCanvas}
      />
      <Sidebar className={classes.sidebar} closeSidebar={toggleSidebar} />
      <Box className={classes.content}>
        <Header openSidebar={toggleSidebar} />
        <Box className={classes.children}>
          {children}
        </Box>
        <img className={classes.greenBlob} src={GreenGlobImg} alt="" />
      </Box>
    </Box>
  );
};
