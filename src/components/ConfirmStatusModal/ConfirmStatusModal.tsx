import React, {
  useCallback, useMemo, VFC,
} from 'react';

import {
  Typography, Button, Box,
} from '@material-ui/core';
import userSelector from 'store/user/selectors';
import { useShallowSelector } from 'hooks';
import { State, UserState } from 'types';
import clsx from 'clsx';
import { Modal } from 'components/Modal';
import { useStyles } from './ConfirmStatusModal.styles';

interface Props {
  className?: string;
  open?: boolean;
  statusType: 'active' | 'live';
  date: number | Date; // unix or Date
  setIsModalOpen: (bool: boolean) => void;
  onClose?: () => void;
  onAccept?: () => void;
}

export const ConfirmStatusModal: VFC<Props> = ({
  open, statusType, date, setIsModalOpen,
}) => {
  const classes = useStyles();

  const dateAsString = useMemo(() => (typeof date === 'number' ? new Date(date * 1e3) : date).toDateString(), [date]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

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
        Confirm {statusType} status
      </Typography>
    </Box>
  ), [classes.modalTitle, isLight, statusType]);

  return (
    <Modal className={clsx(classes.root)} open={open} onClose={closeModal} title={title}>
      <Typography
        className={clsx(classes.desc, 'l')}
        variant="body1"
        align="left"
      >
        Confirm {statusType} status before {dateAsString} otherwise your funds will be transferred to reserve address
      </Typography>
      <Box className={classes.modalControls}>
        <Button
          className={clsx(classes.button)}
          size="large"
          type="submit"
          color="secondary"
          variant="outlined"
          onClick={closeModal}
        >
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};
