import React, {
  useCallback, useMemo, useState, VFC,
} from 'react';
import {
  Typography, Button, Box, TextField,
} from '@material-ui/core';
import clsx from 'clsx';

import userSelector from 'store/user/selectors';
import { useShallowSelector } from 'hooks';
import { Modal } from 'components/Modal';
import { fieldsHelper, IModalFieldsState, TFieldKeys } from './RequestWithdrawalModal.helpers';
import { useStyles } from './RequestWithdrawalModal.styles';

interface Props {
  className?: string;
  open?: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  onClose?: () => void;
  onAccept?: (modalState: IModalFieldsState) => void;
}

export const RequestWithdrawalModal: VFC<Props> = ({
  open, setIsModalOpen, onClose, onAccept,
}) => {
  const classes = useStyles();
  const [modalState, setModalState] = useState<IModalFieldsState>({
    addressToSend: '',
    amount: '',
    tokenAddress: '',
  });
  const closeModal = useCallback(() => {
    if (onClose) {
      onClose();
    }
    setIsModalOpen(false);
  }, [onClose, setIsModalOpen]);

  const handleAccept = useCallback(() => {
    if (onAccept) {
      onAccept(modalState);
    }
  }, [onAccept, modalState]);

  const handleChange = useCallback(
    (key: TFieldKeys) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const newModalState: IModalFieldsState = {
        ...modalState,
        [key]: e.target.value,
      };
      setModalState(newModalState);
    }, [modalState],
  );

  const { isLight } = useShallowSelector(userSelector.getUser);

  const title = useMemo(() => (
    <Box className={classes.modalTitle}>
      <Typography
        className={clsx(isLight ? '' : 'acidGreen gradient')}
        variant="h2"
        align="left"
      >
        Request withdrawal
      </Typography>
    </Box>
  ), [classes.modalTitle, isLight]);

  return (
    <Modal className={clsx(classes.root)} open={open} onClose={closeModal} title={title}>
      <Box className={classes.modalInner}>
        <Box>
          {fieldsHelper.map(({ key, label }) => (
            <Box key={key} className={classes.fieldContainer}>
              <TextField
                value={modalState[key]}
                label={label}
                onChange={handleChange(key)}
              />
            </Box>
          ))}
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
            Request
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
