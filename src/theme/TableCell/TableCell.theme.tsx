import { ComponentsProps } from '@material-ui/core/styles/props';
import { Overrides } from '@material-ui/core/styles/overrides';
import { Theme } from '@material-ui/core';
import {
  COLOR_GREY_5, COLOR_BLACK_4, COLOR_BLACK_3, COLOR_GREY_3,
} from 'theme/colors';

export const getMuiTableCellDefaultProps = (): ComponentsProps['MuiTableCell'] => ({});

export const getMuiTableCell = (theme: Theme): Overrides['MuiTableCell'] => ({
  root: {
    borderBottom: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_3}`,
  },
  head: {
    color: theme.palette.type === 'dark' ? COLOR_BLACK_4 : COLOR_GREY_5,
  },
  footer: {
    borderBottom: 'none',
  },
});
