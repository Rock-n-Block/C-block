import { Theme } from '@material-ui/core';
import { CSSProperties, CreateCSSProperties } from '@material-ui/styles';

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
