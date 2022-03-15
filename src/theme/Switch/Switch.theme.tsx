import { Theme } from '@material-ui/core';
import { Overrides } from '@material-ui/core/styles/overrides';
import { ComponentsProps } from '@material-ui/core/styles/props';

import {
  COLOR_AKZ, COLOR_BLACK_1, COLOR_BLACK_4, COLOR_BLACK_5, COLOR_GREY_3, COLOR_GREY_5,
} from '../colors';

export const getMuiSwitch = (theme: Theme): Overrides['MuiSwitch'] => {
  const trackSize = {
    width: '56px',
    height: '32px',
    borderRadius: '64px',
    padding: 0,
  };

  const switchBaseSize = {
    padding: 0,
    width: trackSize.height,
    height: trackSize.height,
    borderRadius: '50%',
  };

  return {
    root: {
      ...trackSize,
      overflow: 'hidden',
      opacity: '1 !important',
      margin: theme.spacing(1),

      '&:focus-within::before': {
        display: 'block',
      },
    },
    track: {
      // ...trackSize,
      borderRadius: '64px',
      opacity: 0.5,
      backgroundColor: theme.palette.type === 'dark' ? COLOR_BLACK_4 : COLOR_GREY_5,

      '.MuiSwitch-switchBase$checked + &': {
        background: COLOR_AKZ,
        opacity: 1,
      },
      '.MuiSwitch-root:hover &': {
        opacity: 0.75,
      },
      '.MuiSwitch-root:active .MuiSwitch-switchBase:not($disabled) + &': {
        opacity: 1,
      },
      '.MuiSwitch-root:active .MuiSwitch-switchBase$checked:not($disabled) + &': {
        opacity: 0.5,
      },
      '.MuiSwitch-switchBase.Mui-disabled + &': {
        opacity: 0.25,
      },
    },
    sizeSmall: {
      padding: 0,
      width: 32,
      height: 20,
      '&.MuiSwitch-sizeSmall .MuiSwitch-switchBase': {
        width: 32,
        height: 20,
        transform: 'translateX(calc(37px - 100%))',
        '&.MuiSwitch-track': {
          width: '32px !important',
          height: '20px !important',
        },
        '&.MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          width: 32,
          height: 20,
        },
        '&$checked': {
          '&, &:hover, &:active': {
            background: 'transparent',
          },
          transform: 'translateX(calc(27px - 100%))',
        },
      },
    },
    switchBase: {
      ...switchBaseSize,
      background: 'transparent',
      opacity: '1 !important',

      '&, &:hover, &:active': {
        background: 'transparent',
      },

      '&$checked': {
        '&, &:hover, &:active': {
          background: 'transparent',
        },

        transform: `translateX(calc(${trackSize.width} - 100%))`,

        '& .MuiSwitch-thumb': {
          backgroundColor: theme.palette.type === 'dark' ? COLOR_BLACK_1 : COLOR_BLACK_5,
        },
      },
    },
    thumb: {
      backgroundColor: theme.palette.type === 'dark' ? COLOR_BLACK_1 : COLOR_GREY_3,
      boxShadow: 'unset',
      width: 26,
      height: 26,
      border: 'none',
    },
  };
};

export const getMuiSwitchDefaultProps = (): ComponentsProps['MuiSwitch'] => ({
  color: 'primary',
});
