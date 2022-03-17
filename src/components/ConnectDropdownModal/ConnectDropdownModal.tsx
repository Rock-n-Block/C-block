import React, {
  useCallback, useMemo, VFC,
} from 'react';

import { Typography, Box, Button } from '@material-ui/core';

import { useWalletConnectorContext } from 'services';
import { WalletProviders } from 'types';
import { Modal } from 'components/Modal';
import { useDispatch } from 'react-redux';
import { disconnectWalletState } from 'store/user/reducer';
import { useStyles } from './ConnectDropdownModal.styles';
import { connectDropdownModalData } from './ConnectDropdownModal.helpers';

export interface ConnectDropdownModalProps {
  address: string;
  open: boolean;
  onClose: () => void;
  className?: string;
}

export const ConnectDropdownModal: VFC<ConnectDropdownModalProps> = ({
  address, open, onClose, className,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { connect } = useWalletConnectorContext();
  const isConnected = useMemo(() => address !== '', [address]);

  const disconnect = useCallback(async () => {
    onClose();
    setTimeout(() => dispatch(disconnectWalletState()), 10);
  }, [onClose]);

  const handleConnect = useCallback((walletProvider: WalletProviders) => {
    onClose();
    connect(walletProvider);
  }, [onClose]);

  return (
    <Modal open={open} onClose={onClose} title={isConnected ? ' ' : 'Connect Wallet'} className={className}>
      {isConnected ? (
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
