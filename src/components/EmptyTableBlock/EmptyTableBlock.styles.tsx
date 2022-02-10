import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_BLACK_1, COLOR_BLACK_4, COLOR_GREY_2, COLOR_GREY_4,
} from 'theme/colors';

import { flexHelper } from 'utils';

// eslint-disable-next-line arrow-body-style
export const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      ...flexHelper(),
      // padding: theme.spacing(),
      // border: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_4 : COLOR_GREY_4}`,
    },
    container: {
      ...flexHelper(),
      flexDirection: 'column',
      padding: theme.spacing(9),
      border: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_4 : COLOR_GREY_4}`,
      borderRadius: theme.spacing(2.5),
      background: theme.palette.type === 'dark' ? COLOR_BLACK_1 : COLOR_GREY_2,
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(9, 3),
      },
    },
    title: {
      marginTop: theme.spacing(3.75),
      textTransform: 'none',
    },
  });
});
