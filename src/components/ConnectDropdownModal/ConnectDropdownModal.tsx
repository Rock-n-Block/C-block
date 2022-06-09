import React, {
  useCallback, VFC,
} from 'react';
import { useDispatch } from 'react-redux';

import { Typography, Box, Button } from '@material-ui/core';

import { useWalletConnectorContext } from 'services';
import { WalletProviders } from 'types';
import { Modal } from 'components';
import {
  useShallowSelector,
} from 'hooks';
import { disconnectWalletState } from 'store/user/reducer';
import userSelectors from 'store/user/selectors';
import { clearAllForms } from 'store/contractForms/reducer';
import authActions from 'store/user/auth/actions';
import { setNotification } from 'utils';
import { connectDropdownModalData } from './ConnectDropdownModal.helpers';
import { useStyles } from './ConnectDropdownModal.styles';

export interface ConnectDropdownModalProps {
  address: string;
  open: boolean;
  onClose: () => void;
  className?: string;
}

export const ConnectDropdownModal: VFC<ConnectDropdownModalProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  address, open, onClose, className,
}) => {
  const dispatch = useDispatch();

  const isAuthenticated = useShallowSelector(
    userSelectors.selectIsAuthenticated,
  );

  const { connect } = useWalletConnectorContext();
  const disconnect = useCallback(async () => {
    onClose();
    dispatch(disconnectWalletState());
    dispatch(authActions.logout());
    dispatch(clearAllForms());
    setNotification({
      type: 'success',
      message: 'Successfully logged out.',
    });
  }, [dispatch, onClose]);

  const handleConnect = useCallback((walletProvider: WalletProviders) => {
    onClose();
    connect(walletProvider);
  }, [onClose]);

  const classes = useStyles();

  return (
    <Modal open={open} onClose={onClose} title={isAuthenticated ? ' ' : 'Connect Wallet'} className={className}>
      {isAuthenticated ? (
        <Box className={classes.disconnectBox}>
          <Typography variant="h3" className={classes.disconnectTitle}>
            Disable your wallet?
          </Typography>
          <Button variant="outlined" size="large" onClick={disconnect}>Disconnect</Button>
        </Box>
      ) : (
        <>
          {connectDropdownModalData.map(({ label, connectorWallet, walletIcon }) => (
            <Box
              key={label}
              className={classes.connectBtn}
              onClick={() => handleConnect(connectorWallet)}
            >
              <img className={classes.walletIcon} src={walletIcon} alt={walletIcon} />
              <Typography variant="body1">{label}</Typography>
            </Box>
          ))}
        </>
      )}
    </Modal>
  );
};
