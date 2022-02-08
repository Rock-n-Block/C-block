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

interface Props {
  className?: string;
  open?: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  onClose?: () => void;
  onAccept?: () => void;
}

export const SetUpModal: VFC<Props> = ({ open, setIsModalOpen }) => {
  const classes = useStyles();
  const [addresses, setAddresses] = useState<AddressesT>(addressesArr);

  const addAddressHandler = useCallback(() => {
    setAddresses([...addresses, { address: '', id: addresses[addresses.length - 1].id + 1 }]);
  }, [addresses]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
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
    <Modal className={clsx(classes.root)} open={open} onClose={closeModal} title={title}>
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
          className={clsx(classes.saveButton, classes.button)}
          size="large"
          type="submit"
          color="secondary"
          variant="outlined"
          onClick={closeModal}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};
