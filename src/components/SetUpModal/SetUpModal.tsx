import React, {
  useCallback, useMemo, useState, VFC,
} from 'react';

import {
  Typography, Button, Box, TextField,
} from '@material-ui/core';
import userSelector from 'store/user/selectors';
import { useShallowSelector } from 'hooks';
import { State, UserState } from 'types';
import clsx from 'clsx';
import { Modal } from 'components/Modal';
import { useStyles } from './SetUpModal.styles';
import { PlusIcon } from '../../theme/icons';
import { addressesArr, AddressesT } from './SetUpModal.helpers';

interface PaymentModalProps {
  open?: boolean;
  onClose?: () => void;
  onAccept?: () => void;
  className?: string;
  setIsSetUpModalOpen: (bool) => void;
}

export const SetUpModal: VFC<PaymentModalProps> = ({ open, setIsSetUpModalOpen }) => {
  const classes = useStyles();
  const [addresses, setAddresses] = useState<AddressesT>(addressesArr);

  const addAddressHandler = useCallback(() => {
    setAddresses([...addresses, { address: '', id: addresses[addresses.length - 1].id + 1 }]);
  }, [addresses]);

  const closeSetUpModal = useCallback(() => {
    setIsSetUpModalOpen(false);
    setAddresses([{ address: '', id: 0 }]);
  }, []);

  const {
    isLight,
  } = useShallowSelector<State, UserState>(userSelector.getUser);

  const title = useMemo(() => (
    <Box className={classes.modalTitle}>
      <Typography
        align="left"
        className={clsx(isLight ? '' : 'acidGreen gradient')}
        variant="h2"
      >
        Set up
      </Typography>
    </Box>
  ), []);

  return (
    <Modal open={open} onClose={closeSetUpModal} title={title} className={clsx(classes.root)}>
      <Typography
        className={clsx(classes.desc, 'l')}
        variant="body1"
        align="left"
      >
        Please determine the addresses of tokens that
        need to be transferred and give approve to the
        contract to transfer them
      </Typography>
      <Box>
        {addresses.map(({ address, id }) => (
          <Box key={id} className={classes.inputContainer}>
            <TextField value={address} label="Token address" />
            <Button className={clsx(classes.button, classes.approveButton)} variant="outlined">Approve</Button>
          </Box>
        ))}
        <Button
          variant="outlined"
          onClick={addAddressHandler}
          endIcon={<PlusIcon />}
        >
          Add address
        </Button>
      </Box>
      <Box className={classes.modalControls}>
        <Button
          size="large"
          type="submit"
          color="secondary"
          variant="outlined"
          className={clsx(classes.saveButton, classes.button)}
          onClick={closeSetUpModal}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};
