import { Theme } from '@material-ui/core';
import { Overrides } from '@material-ui/core/styles/overrides';
import { ComponentsProps } from '@material-ui/core/styles/props';
// @ts-expect-error: no types for @fontssource/inter module
import InterFontFace from '@fontsource/inter';
import { COLOR_BLACK } from 'theme/colors';

export const getMuiCssBaseline = (theme: Theme): Overrides['MuiCssBaseline'] => ({
  '@global': {
    '@font-face': [InterFontFace],
    html: {
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      boxSizing: 'border-box',
      background: COLOR_BLACK,
    },
    body: {
      overflowX: 'hidden',
      margin: theme.spacing(0),
    },
  },
});

export const getMuiCssBaselineDefaultProps = (): ComponentsProps['MuiCssBaseline'] => ({});
