import React, { VFC } from 'react';

import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { shortenPhrase } from 'utils';
import { Copyable } from '../Copyable';
import { useStyles } from './AddressButton.styles';

export interface AddressButtonProps {
  onClick: () => void;
  address: string;
  className?: string;
}

export const AddressButton: VFC<AddressButtonProps> = ({ onClick, address, className }) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.root, className)} onClick={onClick}>
      <Typography>{shortenPhrase(address)}</Typography>
      <Copyable valueToCopy={address} withIcon />
    </Box>
  );
};
