import { Theme } from '@material-ui/core';
import { Overrides } from '@material-ui/core/styles/overrides';
import { ComponentsProps } from '@material-ui/core/styles/props';
import { COLOR_BLACK_1, COLOR_BLACK_3, COLOR_GREY_2 } from 'theme/colors';

export const getMuiDialogProps = (theme: Theme): Overrides['MuiDialog'] => ({
  root: {
  },
  paper: {
    border: `1px solid ${COLOR_BLACK_3}`,
    paddingTop: theme.spacing(4),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    background: theme.palette.type === 'dark' ? COLOR_BLACK_1 : COLOR_GREY_2,
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
});

export const getMuiDialogDefaultProps = (): ComponentsProps['MuiDialog'] => ({});
