import { Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles';

export const flexHelper = (justifyContent = 'center', alignItems = 'center'): CSSProperties => ({
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
