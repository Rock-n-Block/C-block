import React, { useMemo, VFC } from 'react';

import { Typography, Button, Box } from '@material-ui/core';
import userSelector from 'store/user/selectors';
import { useShallowSelector } from 'hooks';
import { State, UserState } from 'types';
import clsx from 'clsx';
import { Modal } from 'components/Modal';
import { useStyles } from './DisclaimerModal.styles';
import { disclaimerBullets } from './DisclaimerModal.helper';

export interface DisclaimerModalProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  className?: string;
}

export const DisclaimerModal: VFC<DisclaimerModalProps> = ({
  open, onClose, onAccept, className,
}) => {
  const classes = useStyles();

  const {
    isLight,
  } = useShallowSelector<State, UserState>(userSelector.getUser);

  const title = useMemo(() => (
    <Typography
      align="left"
      className={isLight ? '' : 'acidGreen'}
      variant="h2"
    >
      Disclaimer
    </Typography>
  ), []);

  return (
    <Modal title={title} open={open} onClose={onClose} className={className}>
      {disclaimerBullets.map((disclaimer) => (
        <Box className={classes.disclaimerContainer}>
          <Box className={classes.bullet} />
          <Typography>{disclaimer}</Typography>
        </Box>
      ))}
      <Box className={classes.disclaimerControls}>
        <Button
          size="large"
          type="submit"
          color="secondary"
          variant="outlined"
          className={clsx(classes.acceptButton, classes.button)}
          onClick={onAccept}
        >
          Accept
        </Button>
        <Button
          size="large"
          type="reset"
          variant="outlined"
          className={clsx(classes.cancelButton, classes.button)}
          onClick={onClose}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};
