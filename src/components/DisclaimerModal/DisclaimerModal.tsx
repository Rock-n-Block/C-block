import React, { useMemo, VFC } from 'react';

import { Typography, Button, Box } from '@material-ui/core';
import userSelector from 'store/user/selectors';
import { useShallowSelector } from 'hooks';
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

  const { isLight } = useShallowSelector(userSelector.getUser);

  const title = useMemo(() => (
    <Typography
      align="left"
      className={isLight ? '' : 'acidGreen gradient'}
      variant="h2"
    >
      Disclaimer
    </Typography>
  ), [isLight]);

  return (
    <Modal title={title} open={open} onClose={onClose} className={className}>
      {disclaimerBullets.map((disclaimer, index) => (
        <Box key={`${disclaimer + index}`} className={classes.disclaimerContainer}>
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
