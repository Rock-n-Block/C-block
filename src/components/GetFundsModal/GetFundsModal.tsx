import React, {
  useCallback, useMemo, useState, VFC,
} from 'react';
import clsx from 'clsx';
import {
  Typography, Button, Box, TextField,
} from '@material-ui/core';

import userSelector from 'store/user/selectors';
import { useShallowSelector } from 'hooks';
import { Modal } from 'components/Modal';
import { PlusIcon } from 'theme/icons';
import { fieldsHelper, ITokenAddressField } from './GetFundsModal.helpers';
import { useStyles } from './GetFundsModal.styles';

export interface Props {
  className?: string;
  open?: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  onClose?: () => void;
  onAccept?: () => void;
}

export const GetFundsModal: VFC<Props> = ({
  open,
  setIsModalOpen,
  onClose,
  onAccept,
}) => {
  const classes = useStyles();
  const [addresses, setAddresses] =
    useState<ITokenAddressField[]>(fieldsHelper);

  const addAddressHandler = useCallback(() => {
    setAddresses([
      ...addresses,
      { address: '', id: addresses[addresses.length - 1].id + 1 },
    ]);
  }, [addresses]);

  const closeModal = useCallback(() => {
    if (onClose) {
      onClose();
    }
    setIsModalOpen(false);
    setAddresses([{ address: '', id: 0 }]);
  }, [onClose, setIsModalOpen]);

  const handleAccept = useCallback(() => {
    if (onAccept) {
      onAccept();
    }
    closeModal();
  }, [closeModal, onAccept]);

  const { isLight } = useShallowSelector(userSelector.getUser);

  const title = useMemo(
    () => (
      <Box className={classes.modalTitle}>
        <Typography
          className={clsx(isLight ? '' : 'acidGreen gradient')}
          align="left"
          variant="h2"
        >
          Get funds
        </Typography>
      </Box>
    ),
    [classes.modalTitle, isLight],
  );

  return (
    <Modal
      className={clsx(classes.root)}
      open={open}
      onClose={closeModal}
      title={title}
    >
      <Typography
        className={clsx(classes.desc, 'l')}
        variant="body1"
        align="left"
      >
        Put the adddresses of tokens that you want to withdraw
      </Typography>
      <Box>
        {addresses.map(({ address, id }) => (
          <Box key={id} className={classes.inputContainer}>
            <TextField value={address} label="Token address" />
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
          className={clsx(classes.button)}
          size="large"
          type="submit"
          color="secondary"
          variant="outlined"
          onClick={handleAccept}
        >
          Get
        </Button>
      </Box>
    </Modal>
  );
};
