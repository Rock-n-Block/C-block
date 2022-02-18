import React, {
  useCallback, useMemo, useState, VFC,
} from 'react';
import {
  Container, Typography, Box, IconButton, Grid,
} from '@material-ui/core';
import clsx from 'clsx';
import { Logo } from 'components/Logo';
import { Menu } from 'theme/icons';
import userSelector from 'store/user/selectors';
import { State, UserState } from 'types';
import { useShallowSelector, useNavigation } from 'hooks';
import { Breadcrumbs, ConnectDropdownModal } from 'components';
import { ConnectButton } from './components/ConnectButton';
import { useStyles } from './Header.styles';
import { NetTag } from './components/NetTag';

export interface HeaderProps {
  openSidebar: () => void,
  className?: string;
}

export const Header: VFC<HeaderProps> = ({ openSidebar, className }) => {
  const classes = useStyles();

  const {
    address, isLight, isMainnet,
  } = useShallowSelector<State, UserState>(userSelector.getUser);

  const [paths, title, icon] = useNavigation();

  const [isModalOpen, setModalOpen] = useState(false);

  const isBreadcrumbsVisible = useMemo(() => paths.length > 1, [paths.length]);

  const handleModal = useCallback(() => {
    setModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

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
        <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
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
      <ConnectDropdownModal
        address={address}
        open={isModalOpen}
        onClose={closeModal}
      />
    </Container>
  );
};
