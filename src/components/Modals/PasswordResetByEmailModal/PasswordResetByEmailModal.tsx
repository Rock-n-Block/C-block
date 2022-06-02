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
import { EmailIcon } from 'theme/icons';
import {
  IField,
  initialFieldsState,
} from './PasswordResetByEmailModal.helpers';
import { useStyles } from './PasswordResetByEmailModal.styles';

export interface Props {
  className?: string;
  open?: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  onClose?: () => void;
  onAccept?: (email: IField) => void;
}

export const PasswordResetByEmailModal: VFC<Props> = ({
  open,
  setIsModalOpen,
  onClose,
  onAccept,
}) => {
  const classes = useStyles();
  const [email, setEmail] = useState<IField>(initialFieldsState);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const clearInputs = useCallback(() => {
    setEmail(initialFieldsState);
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
      onAccept(email);
    }
    closeModal();
  }, [email, closeModal, onAccept]);

  const { isLight } = useShallowSelector(userSelector.getUser);

  const title = useMemo(
    () => (
      <Box className={classes.title}>
        <Typography
          className={clsx(isLight ? '' : 'acidGreen gradient')}
          align="left"
          variant="h2"
        >
          Enter e-mail for password reset
        </Typography>
      </Box>
    ),
    [classes.title, isLight],
  );

  return (
    <Modal
      open={open}
      onClose={closeModal}
      title={title}
    >
      <Box>
        <Box className={classes.inputContainer}>
          <TextField
            value={email}
            label="Email"
            onChange={handleChange}
            InputProps={{
              endAdornment: <EmailIcon />,
            }}
          />
        </Box>
      </Box>
      <Box className={classes.buttonsContainer}>
        <Button
          className={clsx(classes.button)}
          size="large"
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleAccept}
          fullWidth
        >
          Send
        </Button>
      </Box>
    </Modal>
  );
};
