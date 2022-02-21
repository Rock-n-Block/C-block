import React, { useCallback, VFC } from 'react';

import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { Modal } from '../Modal';
import { Loader } from '../Loader';
import { useStyles } from './SendTransactionModal.styles';

interface Props {
  className?: string;
  open?: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  onClose?: () => void;
  onAccept?: () => void;
}

export const SendTransactionModal: VFC<Props> = ({ open, setIsModalOpen }) => {
  const classes = useStyles();

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  return (
    <Modal
      open={open}
      onClose={closeModal}
      title=" "
    >
      <Loader />
      <Box className={classes.textContainer}>
        <Typography
          className={clsx(classes.desc, 'l')}
          variant="h3"
          align="center"
        >
          Please press &quot;Send&quot; button in extension
        </Typography>
      </Box>
    </Modal>
  );
};
