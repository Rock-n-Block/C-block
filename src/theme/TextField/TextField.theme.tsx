/* eslint-disable @typescript-eslint/no-unused-vars */
import { Theme } from '@material-ui/core';
import { Overrides } from '@material-ui/core/styles/overrides';
import { ComponentsProps } from '@material-ui/core/styles/props';
import {
  COLOR_ACID_GREEN,
  COLOR_BLACK_1,
  COLOR_BLACK_2,
  COLOR_BLACK_3,
  COLOR_BLACK_4,
  COLOR_ERROR,
  COLOR_GREY,
  COLOR_GREY_1,
  COLOR_GREY_2,
  COLOR_GREY_3,
  COLOR_GREY_4,
  COLOR_GREY_5,
  COLOR_GREY_6,
} from 'theme/colors';

export const getMuiInputBase = (theme: Theme): Overrides['MuiInputBase'] => ({
  root: {
    background: theme.palette.type === 'dark' ? COLOR_BLACK_2 : COLOR_GREY_4,
  },
  input: {
    borderRadius: theme.spacing(1.5),
    '&:-webkit-autofill': {
      boxShadow: '0 0 0 1000px transparent inset !important',
      transitionDelay: '9999s',
      transitionProperty: 'background-color, color',
    },
  },
});

export const getMuiOutlinedInput = (
  theme: Theme,
): Overrides['MuiOutlinedInput'] => ({
  root: {
    height: theme.spacing(7),
    color: 'white !important',
    borderRadius: theme.spacing(1.5),
    '& legend': {
      maxWidth: 0,
    },
    '&$focused:not(&$error) input': {
      color: theme.palette.type === 'dark' ? COLOR_ACID_GREEN : COLOR_GREY_6,
    },
    '&$focused:not(&$error) svg': {
      '& > *': {
        fill: theme.palette.type === 'dark' ? COLOR_ACID_GREEN : COLOR_GREY_6,
      },
    },
    '&$focused:not(&$error) fieldset': {
      borderWidth: 1,
      borderColor: theme.palette.type === 'dark' ? COLOR_ACID_GREEN : COLOR_GREY_6,
    },
    '&:not(&$disabled):hover fieldset, &$error fieldset': {
      borderWidth: 1,
      borderColor: theme.palette.type === 'dark' ? COLOR_BLACK_4 : COLOR_GREY_4,
    },
    '&$error fieldset': {
      borderWidth: 1,
      borderColor: COLOR_ERROR,
    },
    '&$error svg': {
      '& > *': {
        fill: COLOR_ERROR,
      },
    },
    '&$disabled fieldset': {
      borderWidth: 1,
      backgroundColor: theme.palette.type === 'dark' ? COLOR_BLACK_1 : COLOR_GREY_3,
    },
    '&$disabled input': {
      borderWidth: 1,
      color: `${theme.palette.type === 'dark' ? COLOR_GREY_1 : COLOR_GREY_6}`,
    },
    '&$disabled .MuiOutlinedInput-notchedOutline': {
      background: 'none',
      borderColor: `${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2}`,
    },

    '& fieldset': {
      borderWidth: 1,
      borderColor: theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2,
    },
    '& svg': {
      zIndex: 99,
    },
  },
  multiline: {
    height: theme.spacing(20),
    '& > *': {
      '&:first-child': {
        position: 'absolute',
        top: theme.spacing(3),
        left: 0,
        width: `calc(100% - ${theme.spacing(2.5) + theme.spacing(1)}px)`,
        height: '100% !important',
        maxHeight: 100,
        borderRadius: '0 !important',
        padding: `${theme.spacing(1, 1, 1, 2.5)} !important`,
        overflow: 'auto !important',
        '&:focus': {
          color: theme.palette.type === 'dark' ? COLOR_ACID_GREEN : COLOR_GREY_6,
        },
      },
    },
  },
  input: {
    color: theme.palette.type === 'dark' ? COLOR_GREY : COLOR_BLACK_1,
    padding: `${theme.spacing(2, 2.5)}`,
  },
});

export const getMuiInputLabel = (theme: Theme): Overrides['MuiInputLabel'] => ({
  root: {
    color: theme.palette.type === 'dark' ? COLOR_GREY_1 : COLOR_GREY_6,
  },
  outlined: {
    transform: `translate(${[2.5, 2.5].map((val) => `${theme.spacing(val)}px`).join(', ')}) scale(1)`,
    '&$shrink': {
      color: theme.palette.type === 'dark' ? COLOR_BLACK_4 : COLOR_GREY_5,
      transform: `translate(${[2.5, 1].map((val) => `${theme.spacing(val)}px`).join(', ')}) scale(0.75)`,
    },
  },
});

export const getMuiInputLabelDefaultProps = (): ComponentsProps['MuiInputLabel'] => ({
  // shrink: true,
});

export const getMuiTextField = (theme: Theme): Overrides['MuiTextField'] => ({
  root: {
    width: '100%',

    '& label[data-shrink=true] + .MuiInputBase-formControl .MuiInputBase-input': {
      padding: `${theme.spacing(3, 2.5, 1.5)}`,
    },
  },
});

export const getMuiTextFieldDefaultProps = (): ComponentsProps['MuiTextField'] => ({
  variant: 'outlined',
  SelectProps: {
    MenuProps: {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
      getContentAnchorEl: null,
    },
  },
});

export const getMuiFormHelperText = (): Overrides['MuiTextField'] => ({
  root: {
    position: 'absolute',
    bottom: '-22px',
  },
});
