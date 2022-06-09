import React, { VFC } from 'react';

import { Box, Button, IconButton } from '@material-ui/core';
import clsx from 'clsx';

import { AddressButton } from 'components';
import { useBreakpoints, useShallowSelector, WindowFormat } from 'hooks';
import userSelectors from 'store/user/selectors';
import { LogOutIcon } from 'theme/icons';

import { useStyles } from './ConnectButton.styles';

export interface ConnectButtonProps {
  address: string;
  handleModal: () => void;
  className?: string;
}

export const ConnectButton: VFC<ConnectButtonProps> = ({ address, handleModal, className }) => {
  const classes = useStyles();
  const isAuthenticated = useShallowSelector(
    userSelectors.selectIsAuthenticated,
  );
  const windowFormat = useBreakpoints({
    desktop: WindowFormat.desktop,
    mobile: WindowFormat.mobile,
    tablet: WindowFormat.tablet,
    wideDesktop: WindowFormat.wideDesktop,
  });

  return (
    <Box className={clsx(classes.root, className)}>
      {isAuthenticated ? (
        <Box className={classes.connectButtonWrapper}>
          <AddressButton
            className={classes.addressButton}
            onClick={handleModal}
            address={address}
          />
          {
            windowFormat === WindowFormat.mobile ? (
              <IconButton
                className={classes.signOutIconButton}
                color="primary"
                onClick={handleModal}
              >
                <LogOutIcon />
              </IconButton>
            ) : (
              <Button
                variant="outlined"
                size="medium"
                className={clsx(classes.connectButton, classes.signOutButton)}
                onClick={handleModal}
              >
                Sign out
              </Button>
            )
          }
        </Box>
      ) : (
        <Box className={classes.connectButtonWrapper}>
          <Button
            variant="contained"
            size="medium"
            className={classes.connectButton}
            onClick={handleModal}
          >
            Log in
          </Button>
        </Box>
      )}
    </Box>
  );
};
