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
import { incrementLastId } from 'utils/identifactors';
import {
  IGetFundsModalTokenAddressField,
  initialFieldsState,
} from './GetFundsModal.helpers';
import { useStyles } from './GetFundsModal.styles';

export interface Props {
  className?: string;
  open?: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  onClose?: () => void;
  onAccept?: (addresses: IGetFundsModalTokenAddressField[]) => void;
}

export const GetFundsModal: VFC<Props> = ({
  open,
  setIsModalOpen,
  onClose,
  onAccept,
}) => {
  const classes = useStyles();
  const [addresses, setAddresses] =
    useState<IGetFundsModalTokenAddressField[]>(initialFieldsState);

  const addAddressHandler = useCallback(() => {
    setAddresses([
      ...addresses,
      { id: incrementLastId(addresses), address: '' },
    ]);
  }, [addresses]);

  const handleChange = (id: number) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setAddresses(addresses.map((item) => (item.id === id ? {
      id,
      address: e.target.value,
    } : item)));
  };

  const clearInputs = useCallback(() => {
    setAddresses(initialFieldsState);
  }, []);

  const closeModal = useCallback(() => {
    if (onClose) {
      clearInputs();
      onClose();
    }
    setIsModalOpen(false);
  }, [clearInputs, onClose, setIsModalOpen]);

  const handleAccept = useCallback(() => {
    if (onAccept) {
      onAccept(addresses);
    }
    closeModal();
  }, [addresses, closeModal, onAccept]);

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
            <TextField
              value={address}
              label="Token address"
              onChange={handleChange(id)}
            />
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
