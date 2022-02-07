import React, { FC, ReactNode, useMemo } from 'react';

import {
  Box, Dialog, Typography, IconButton,
} from '@material-ui/core';
import clsx from 'clsx';

import { CloseIcon } from 'theme/icons';
import { useStyles } from './Modal.styles';

export interface ModalProps {
  className?: string;
  title?: string | ReactNode;
  open: boolean;
  onClose: () => void,
}

export const Modal: FC<ModalProps> = ({
  title, open, className, children, onClose,
}) => {
  const hasTitle = useMemo(() => {
    if (!title) return false;
    if (typeof title === 'string') {
      return Boolean(title.trim()); // to add marginBottom if title is ' ' (but not if '')
    }
    return true;
  }, [title]);
  const classes = useStyles({ hasTitle });
  const titleJsx = useMemo(() => {
    if (!title) return null;
    if (typeof title === 'string') {
      return <Typography variant="h3">{title}</Typography>;
    }
    return title;
  }, [title]);
  return (
    <Dialog
      className={clsx(classes.root, className)}
      transitionDuration={{
        enter: 200,
        exit: 0,
      }}
      open={open}
      onClose={onClose}
    >
      <Box className={classes.modalTitle}>
        {titleJsx}
        <IconButton color="secondary" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      {children}
    </Dialog>
  );
};
