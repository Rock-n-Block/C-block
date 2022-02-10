import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_BLACK_1, COLOR_BLACK_3, COLOR_BLACK_4, COLOR_BLACK_5, COLOR_GREY, COLOR_GREY_1, COLOR_GREY_2, COLOR_GREY_3, COLOR_GREY_5,
} from 'theme/colors';
// import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginTop: -((40 + 2 * 10) - theme.spacing(2)), // must be theme.spacing(2)
  },
  tableContainer: {
    padding: theme.spacing(5),
    background: theme.palette.type === 'dark' ? COLOR_BLACK_1 : COLOR_GREY_2,
    borderRadius: theme.spacing(2.5),
    border: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_3}`,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  headCell: {
    color: theme.palette.type === 'dark' ? COLOR_BLACK_4 : COLOR_GREY_5,
  },
  cell: {
    color: theme.palette.type === 'dark' ? COLOR_GREY_1 : COLOR_BLACK_1,
  },
  button: {
    width: 150,
    height: 40,
    color: theme.palette.type === 'dark' ? COLOR_GREY : COLOR_BLACK_5,
  },

  mobileTableData: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));
