import React, {
  useCallback, useMemo, VFC,
} from 'react';

import {
  Typography, Button, Box, TextField,
} from '@material-ui/core';
import userSelector from 'store/user/selectors';
import { useShallowSelector } from 'hooks';
import { State, UserState } from 'types';
import clsx from 'clsx';
import { Modal } from 'components/Modal';
import { useStyles } from './RequestWithdrawalModal.styles';
import { fieldsHelper } from './RequestWithdrawalModal.helpers';

interface Props {
  className?: string;
  open?: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  onClose?: () => void;
  onAccept?: () => void;
}

export const RequestWithdrawalModal: VFC<Props> = ({
  open, setIsModalOpen, onClose, onAccept,
}) => {
  const classes = useStyles();
  const closeModal = useCallback(() => {
    if (onClose) {
      onClose();
    }
    setIsModalOpen(false);
  }, [onClose, setIsModalOpen]);

  const handleAccept = useCallback(() => {
    if (onAccept) {
      onAccept();
    }
    closeModal();
  }, [closeModal, onAccept]);

  const {
    isLight,
  } = useShallowSelector<State, UserState>(userSelector.getUser);

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
          {fieldsHelper.map(({ id, label, value }) => (
            <Box key={id} className={classes.fieldContainer}>
              <TextField value={value} label={label} />
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
