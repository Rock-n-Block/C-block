import React, { useMemo, VFC } from 'react';

import clsx from 'clsx';
import { Modal } from 'components/Modal';
import { Box, Typography } from '@material-ui/core';
import { SuccessBigIcon, ErrorBigIcon } from 'theme/icons';
import { useStyles } from './CompleteModal.styles';

export interface CompleteModalProps {
  open: boolean;
  onClose?: () => void;
  result?: boolean;
}

export const CompleteModal: VFC<CompleteModalProps> = ({
  open, onClose, result,
}) => {
  const classes = useStyles();

  const showSuccess = useMemo(() => (
    <>
      <SuccessBigIcon />
      <Typography className={clsx(classes.desc, 'l')} variant="body1">The transaction was successfully completed</Typography>
    </>
  ), []);

  const showError = useMemo(() => (
    <>
      <ErrorBigIcon />
      <Typography className={clsx(classes.desc, 'l')} variant="body1"> Transaction error !</Typography>
      <Typography className={clsx(classes.desc, 'l')} variant="body1"> Please  come back later</Typography>
    </>
  ), []);

  return (
    <Modal open={open} onClose={onClose} className={clsx(classes.root)}>
      <Box className={classes.icon}>
        {result ? showSuccess : showError}
      </Box>
    </Modal>
  );
};
