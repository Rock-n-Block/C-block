/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  ChangeEvent, ReactElement, VFC,
} from 'react';

import { Box, Switch, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { useStyles } from './CheckBox.styles';

export interface CheckBoxProps {
  icon?: ReactElement;
  name: string;
  label: string;
  value: boolean;
  onClick: (e: string | ChangeEvent<any>) => void;
  className?: string;
}

export const CheckBox: VFC<CheckBoxProps> = ({
  icon, label, name, value, onClick, className,
}) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.root, className)}>
      <Box className={classes.titleIconContainer}>
        {icon}
        <Typography variant="body1">{label}</Typography>
      </Box>
      <Switch name={name} checked={value} onClick={onClick} />
    </Box>
  );
};
