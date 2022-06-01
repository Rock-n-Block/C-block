import { Theme } from '@material-ui/core';
import { Overrides } from '@material-ui/core/styles/overrides';
import { ComponentsProps } from '@material-ui/core/styles/props';
import { CSSProperties } from '@material-ui/styles';

import {
  COLOR_ACID_GREEN,
  COLOR_BLACK,
  COLOR_WHITE,
  COLOR_BLACK_1,
  COLOR_BLACK_3,
  COLOR_BLACK_5,
  COLOR_BUTTON_PRIMARY_DARK_DEFAULT,
  COLOR_BUTTON_PRIMARY_LIGHT_DEFAULT,
  COLOR_BUTTON_PRIMARY_DARK_HOVER,
  COLOR_BUTTON_PRIMARY_LIGHT_HOVER,
  COLOR_BUTTON_PRIMARY_LIGHT_ACTIVE,
  COLOR_BUTTON_PRIMARY_DARK_ACTIVE,
  COLOR_BUTTON_PRIMARY_DARK_DISABLED,
  COLOR_BUTTON_PRIMARY_LIGHT_DISABLED,
  COLOR_BUTTON_SECONDARY_DARK_DEFAULT,
  COLOR_BUTTON_SECONDARY_LIGHT_DEFAULT,
  COLOR_BUTTON_SECONDARY_DARK_HOVER,
  COLOR_BUTTON_SECONDARY_LIGHT_HOVER,
  COLOR_GREY_2,
  COLOR_GREY_3,
  COLOR_BLACK_4,
  COLOR_BLACK_7,
} from 'theme/colors';
import { FontWeights } from 'theme/Typography';

export const getMuiButton = (theme: Theme): Overrides['MuiButton'] => {
  const customStyles: CSSProperties = {
    '&.border-radius-s': {
      borderRadius: theme.spacing(1),
    },
  };

  const containedCommon: CSSProperties = {
    ...theme.typography.body2,
    ...customStyles,
    padding: theme.spacing(1, 4),

    color: COLOR_BLACK_7,
    borderRadius: 100,
    backgroundColor: theme.palette.type === 'dark' ? COLOR_ACID_GREEN : COLOR_GREY_3,
    transition: '200ms',

    '&$sizeLarge': {
      ...theme.typography.button,
      padding: theme.spacing(2, 4),
      color: COLOR_BLACK_7,
    },
    '&$sizeSmall': {
      padding: theme.spacing(1, 2),
      fontSize: '12px',
      lineHeight: '14px',
      fontWeight: FontWeights.fontWeightSemiBold,
    },
    '&:hover': {
      color: COLOR_BLACK,
      background: theme.palette.type === 'dark' ? COLOR_BUTTON_PRIMARY_DARK_HOVER : COLOR_BUTTON_PRIMARY_LIGHT_HOVER,
      backgroundColor: theme.palette.type === 'dark' ? COLOR_ACID_GREEN : COLOR_GREY_3,
      '& $startIcon': {
        '& > *': {
          fill: COLOR_BLACK_3,
        },
      },
    },
    '&:active': {
      color: COLOR_BLACK,
      background: theme.palette.type === 'dark' ? COLOR_BUTTON_PRIMARY_DARK_ACTIVE : COLOR_BUTTON_PRIMARY_LIGHT_ACTIVE,
      '& $startIcon': {
        '& > *': {
          fill: COLOR_BLACK_3,
        },
      },
    },
    '&$disabled': {
      opacity: 0.5,
      borderWidth: 0,
      color: `${theme.palette.type === 'dark' ? COLOR_BUTTON_PRIMARY_DARK_DISABLED : COLOR_BUTTON_PRIMARY_LIGHT_DISABLED} !important`,
      backgroundColor: theme.palette.type === 'dark' ? COLOR_BLACK_4 : COLOR_GREY_2,
      '& $startIcon': {
        '& > *': {
          fill: `${theme.palette.type === 'dark' ? COLOR_BUTTON_PRIMARY_DARK_DISABLED : COLOR_BUTTON_PRIMARY_LIGHT_DISABLED} !important`,
        },
      },
      '& $endIcon': {
        '& > *': {
          fill: theme.palette.type === 'dark' ? COLOR_BUTTON_PRIMARY_DARK_DISABLED : COLOR_BUTTON_PRIMARY_LIGHT_DISABLED,
        },
      },
    },
    '& $startIcon': {
      '& > *': {
        fill: COLOR_BLACK_3,
      },
    },
  };

  const outlinedCommon: CSSProperties = {
    color: COLOR_WHITE,
    borderRadius: 100,
    border: `1px solid ${COLOR_ACID_GREEN}`,
    background: theme.palette.type === 'dark' ? COLOR_BUTTON_PRIMARY_DARK_DEFAULT : COLOR_BUTTON_PRIMARY_LIGHT_DEFAULT,
    transition: '200ms',
    padding: theme.spacing(1, 4),
    ...theme.typography.body2,

    '&$sizeLarge': {
      padding: theme.spacing(2, 4),
      ...theme.typography.button,
    },
    '&$sizeSmall': {
      padding: theme.spacing(1, 2),
      fontSize: '12px',
      lineHeight: '14px',
      fontWeight: FontWeights.fontWeightSemiBold,
    },
    '&:hover': {
      color: COLOR_BLACK,
      background: theme.palette.type === 'dark' ? COLOR_BUTTON_PRIMARY_DARK_HOVER : COLOR_BUTTON_PRIMARY_LIGHT_HOVER,
      '& $startIcon': {
        '& > *': {
          fill: COLOR_BLACK_3,
        },
      },
    },
    '&:active': {
      color: COLOR_BLACK,
      background: theme.palette.type === 'dark' ? COLOR_BUTTON_PRIMARY_DARK_ACTIVE : COLOR_BUTTON_PRIMARY_LIGHT_ACTIVE,
      '& $startIcon': {
        '& > *': {
          fill: COLOR_BLACK_3,
        },
      },
    },
    '&$disabled': {
      opacity: 0.5,
      borderWidth: 0,
      color: `${theme.palette.type === 'dark' ? COLOR_BUTTON_PRIMARY_DARK_DISABLED : COLOR_BUTTON_PRIMARY_LIGHT_DISABLED} !important`,
      background: theme.palette.type === 'dark' ? COLOR_BLACK_4 : COLOR_GREY_2,
      '& $startIcon': {
        '& > *': {
          fill: `${theme.palette.type === 'dark' ? COLOR_BUTTON_PRIMARY_DARK_DISABLED : COLOR_BUTTON_PRIMARY_LIGHT_DISABLED} !important`,
        },
      },
      '& $endIcon': {
        '& > *': {
          fill: theme.palette.type === 'dark' ? COLOR_BUTTON_PRIMARY_DARK_DISABLED : COLOR_BUTTON_PRIMARY_LIGHT_DISABLED,
        },
      },
    },
    '& $startIcon': {
      '& > *': {
        fill: COLOR_ACID_GREEN,
      },
    },
  };

  return {
    outlined: outlinedCommon,
    outlinedPrimary: outlinedCommon,
    outlinedSecondary: {
      ...outlinedCommon,
      background: `${theme.palette.type === 'dark' ? COLOR_BUTTON_SECONDARY_DARK_DEFAULT : COLOR_BUTTON_SECONDARY_LIGHT_DEFAULT} !important`,
      color: `${theme.palette.type === 'dark' ? COLOR_BLACK_1 : COLOR_BLACK_5} !important`,
      '&:hover': {
        background: `${theme.palette.type === 'dark' ? COLOR_BUTTON_SECONDARY_DARK_HOVER : COLOR_BUTTON_SECONDARY_LIGHT_HOVER} !important`,
      },
    },

    contained: containedCommon,
    containedPrimary: containedCommon,

    startIcon: {
      marginRight: theme.spacing(1.5),
      marginLeft: 0,
    },
    endIcon: {
      marginLeft: theme.spacing(1.5),
      marginRight: 0,
    },
  };
};

export const getMuiButtonDefaultProps = (): ComponentsProps['MuiButton'] => ({
  disableElevation: true,
  disableFocusRipple: true,
  disableRipple: true,
});
