import React, {
  useCallback, useMemo,
  VFC,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  Container, Typography, Box, IconButton, Grid,
} from '@material-ui/core';
import clsx from 'clsx';
import { Logo, Breadcrumbs } from 'components';
import { Menu } from 'theme/icons';
import userSelector from 'store/user/selectors';
import { setActiveModal } from 'store/modals/reducer';
import { useShallowSelector, useNavigation } from 'hooks';
import { Modals } from 'types';
import { ConnectButton } from './components/ConnectButton';
import { NetTag } from './components/NetTag';
import { useStyles } from './Header.styles';

export interface HeaderProps {
  openSidebar: () => void,
  className?: string;
}

export const Header: VFC<HeaderProps> = ({ openSidebar, className }) => {
  const classes = useStyles();

  const {
    address, isLight, isMainnet,
  } = useShallowSelector(userSelector.getUser);

  const [paths, title, icon] = useNavigation();

  const isBreadcrumbsVisible = useMemo(() => paths.length > 1, [paths.length]);

  const dispatch = useDispatch();

  const handleModal = useCallback(() => {
    dispatch(setActiveModal({
      modals: {
        [Modals.Login]: true,
      },
    }));
  }, [dispatch]);

  return (
    <Container className={clsx(classes.root, className)}>
      <Box className={classes.headerLogo}>
        <Logo isLight={isLight} />
        <IconButton color="primary" onClick={openSidebar}>
          <Menu />
        </IconButton>
      </Box>
      <Grid container className={classes.breadcrumbsAndConnect}>
        <Grid item xs={12} sm={6} md={6} lg={8} xl={8} className={classes.breadcrumbs}>
          {isBreadcrumbsVisible && <Breadcrumbs paths={paths} />}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <ConnectButton
            handleModal={handleModal}
            address={address}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.titleAndChaintag}>
        <Grid item xs={12} sm={6} md={6} lg={8} xl={8} className={classes.title}>
          {icon && <IconButton>{icon}</IconButton>}
          <Typography
            align="left"
            className={isLight ? '' : 'acidGreen gradient'}
            variant="h2"
          >
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
          {isBreadcrumbsVisible && <NetTag className={classes.chainTag} isTestnet={!isMainnet} />}
        </Grid>
      </Grid>
    </Container>
  );
};
