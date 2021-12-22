import React, { FC } from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import {
  COLOR_BLACK_3,
  COLOR_GREY_1,
  COLOR_GREY_2,
  COLOR_GREY_6,
} from 'theme/colors';

interface IProps {
  className?: string;
  value: string;
}

export const useStyles = makeStyles((theme: Theme) => createStyles({
  disabledInput: {
    '& input': {
      padding: '16px 20px 16px 20px !important',
      color: `${theme.palette.type === 'dark' ? COLOR_GREY_1 : COLOR_GREY_6} !important`,
      textOverflow: 'ellipsis',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      background: 'none !important',
      borderColor: `${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2} !important`,
    },
  },
}));

export const DELETE_ME_DISABLED_TEXTFIELD: FC<IProps> = ({ className, value }) => {
  const classes = useStyles();
  return (
    <TextField
      className={clsx(className, classes.disabledInput)}
      disabled
      value={value}
    />
  );
};
