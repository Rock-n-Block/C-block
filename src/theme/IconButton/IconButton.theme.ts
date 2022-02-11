import { Theme } from '@material-ui/core';
import { Overrides } from '@material-ui/core/styles/overrides';

import {
  COLOR_BLACK,
  COLOR_AKZ,
  COLOR_WHITE,
  COLOR_BLACK_3,
} from 'theme/colors';

export const getMuiIconButton = (theme: Theme): Overrides['MuiIconButton'] => ({
  root: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    color: COLOR_BLACK,
    background: COLOR_AKZ,
    '&:hover': {
      background: COLOR_AKZ,
    },
    '&:active': {
      background: COLOR_AKZ,
    },
    '&$disabled': {
      opacity: 0.5,
      color: COLOR_BLACK,
      backgroundColor: 'transparent',
    },
  },
  colorPrimary: {
    color: COLOR_WHITE,
    background: theme.palette.primary.light,
    border: `1px solid ${COLOR_BLACK_3}`,
    width: 48,
    height: 48,
    '&:hover': {
      background: `${theme.palette.primary.dark} !important`,
    },
    '&:active': {
      background: COLOR_BLACK,
    },
    '&$disabled': {
      opacity: 0.25,
      backgroundColor: COLOR_BLACK,
    },
    '& > *': {
      '& > *': {
        fill: theme.palette.secondary.dark,
      },
    },
  },
  colorSecondary: {
    color: COLOR_BLACK,
    background: 'transparent',
    width: 24,
    height: 24,
    borderRadius: '50%',
    '&:hover': {
      borderWidth: 0,
      borderColor: COLOR_BLACK,
      color: COLOR_BLACK,
      background: 'transparent !important',
    },
    '&:active': {
      borderWidth: 0,
      borderColor: COLOR_BLACK,
      color: COLOR_BLACK,
      background: 'transparent',
    },
    '&$disabled': {
      opacity: 0.5,
      borderWidth: 0,
      color: COLOR_BLACK,
      borderColor: COLOR_BLACK,
    },
  },
});
