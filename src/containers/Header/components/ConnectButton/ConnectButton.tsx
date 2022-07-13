import React, { VFC } from 'react';

import {
  Box, Button,
  TextField,
} from '@material-ui/core';
import clsx from 'clsx';

import {
  useShallowSelector,
} from 'hooks';
import userSelectors from 'store/user/selectors';

import { UserNameBox } from 'components';
import { useStyles } from './ConnectButton.styles';

export interface ConnectButtonProps {
  address: string;
  handleModal: () => void;
  className?: string;
}

export const ConnectButton: VFC<ConnectButtonProps> = ({ address, handleModal, className }) => {
  const classes = useStyles();
  const { userName, avatarUrl } = useShallowSelector(userSelectors.selectProfile);
  const isAdmin = useShallowSelector(userSelectors.selectIsAdmin);
  const isAuthenticated = useShallowSelector(userSelectors.selectIsAuthenticated);

  return (
    <Box className={clsx(classes.root, className)}>
      {isAuthenticated ? (
        <Box className={classes.connectButtonWrapper}>
          <TextField
            className={classes.profileContainer}
            value="Text filled"
            variant="outlined"
            select
            fullWidth
            SelectProps={{
              open: false,
              classes: {
                root: classes.profileContainerSelectRoot,
              },
              MenuProps: {
                style: {
                  pointerEvents: 'none',
                  opacity: 0,
                },
              },
              renderValue: () => (
                <UserNameBox name={userName} address={address} imageUrl={avatarUrl} isExtended={isAdmin} />
              ),
            }}
            onClick={handleModal}
          >
            <Box style={{ display: 'none' }}>&nbsp;</Box>
          </TextField>
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
