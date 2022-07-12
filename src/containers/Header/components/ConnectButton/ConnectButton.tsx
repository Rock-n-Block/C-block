import React, { useMemo, VFC } from 'react';

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
  const isAuthenticated = useShallowSelector(
    userSelectors.selectIsAuthenticated,
  );

  const hasUserImage = useMemo(() => Math.random() > 0.5, []);
  const userImage = hasUserImage ? 'https://avatars.mds.yandex.net/get-verba/1540742/2a0000017fb1a555a52eb01b8ddb17bac37f/realty_main' : '';

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
              MenuProps: {
                style: {
                  pointerEvents: 'none',
                  opacity: 0,
                },
              },
              renderValue: () => (
                <UserNameBox name="" address={address} imageUrl={userImage} hasDefaultRole={hasUserImage} />
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
