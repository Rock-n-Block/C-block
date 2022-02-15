import { Theme } from '@material-ui/core';
import { CSSProperties, CreateCSSProperties } from '@material-ui/styles';

import {
  COLOR_BLACK_3,
  COLOR_GREY_2,
} from 'theme/colors';

/**
 * @param justifyContent default 'center'
 * @param alignItems default 'center'
 */
export const flexHelper = <T extends object = {}>(justifyContent = 'center', alignItems = 'center'): CSSProperties | CreateCSSProperties<T> => ({
  display: 'flex',
  justifyContent,
  alignItems,
});

export const baseFieldWidthRestriction = (theme: Theme) => ({
  minWidth: 240,
  maxWidth: '70%',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
});

export const getBorderStyle = (theme: Theme) => `1px solid ${
  theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2
}`;
export const separator = (theme: Theme, position: 'bottom' | 'top' = 'bottom') => ({
  [`border${position[0].toUpperCase()}${position.slice(1)}`]: getBorderStyle(theme),
});

export const animationsHelper = {
  rotating: {
    '@keyframes rotating': {
      from: {
        transform: 'rotate(0deg)',
      },
      to: {
        transform: 'rotate(360deg)',
      },
    },
  },
};
