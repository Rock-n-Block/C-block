import React, {
  useCallback, useMemo, useState, VFC,
} from 'react';
import { useDispatch } from 'react-redux';

import { Typography, Box, Button } from '@material-ui/core';

import { useWalletConnectorContext } from 'services';
import { WalletProviders } from 'types';
import { AddressButton, Modal, UserNameBox } from 'components';
import {
  useShallowSelector,
} from 'hooks';
import { disconnectWalletState } from 'store/user/reducer';
import userSelectors from 'store/user/selectors';
import { clearAllForms } from 'store/contractForms/reducer';
import authActions from 'store/user/auth/actions';
import { setNotification } from 'utils';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { routes } from 'appConstants';
import { connectDropdownModalData } from './ConnectDropdownModal.helpers';
import { useStyles } from './ConnectDropdownModal.styles';

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

  const [isConfirmDisconnect, setIsConfirmDisconnect] = useState(false);

  const handleCloseModal = useCallback(() => {
    setIsConfirmDisconnect(false);
    onClose();
  }, [onClose]);

  const { connect } = useWalletConnectorContext();
  const disconnect = useCallback(async () => {
    handleCloseModal();
    dispatch(disconnectWalletState());
    dispatch(authActions.logout());
    dispatch(clearAllForms());
    setNotification({
      type: 'success',
      message: 'Successfully logged out.',
    });
  }, [dispatch, handleCloseModal]);

  const handleConnect = useCallback((walletProvider: WalletProviders) => {
    handleCloseModal();
    connect(walletProvider);
  }, [handleCloseModal]);

  const isAuthenticated = useShallowSelector(
    userSelectors.selectIsAuthenticated,
  );

  const classes = useStyles();

  const confirmDisconnectJsx = useMemo(() => (
    <Box className={classes.disconnectBox}>
      <Typography variant="h3" className={classes.disconnectTitle}>
        Disable your wallet?
      </Typography>
      <Button variant="outlined" size="large" onClick={disconnect}>Disconnect</Button>
    </Box>
  ), [classes.disconnectBox, classes.disconnectTitle, disconnect]);

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      title={isAuthenticated ? (
        <UserNameBox name="" imageUrl="" hasDefaultRole />
      ) : 'Connect Wallet'}
      className={className}
    >
      {isAuthenticated && isConfirmDisconnect && confirmDisconnectJsx}
      {isAuthenticated && !isConfirmDisconnect && (
      <>
        <AddressButton className={classes.addressBtn} address={address} onClick={() => {}} />
        <Button
          className={classes.btnItem}
          variant="outlined"
          size="medium"
          href={routes.profile.root}
        >
          <PersonOutlineIcon /> Profile
        </Button>
        <Button
          className={classes.btnItem}
          variant="outlined"
          size="medium"
          onClick={() => setIsConfirmDisconnect(true)}
        >
          Log out
        </Button>
      </>
      )}
      {!isAuthenticated && (
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
