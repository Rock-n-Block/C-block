import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_BLACK_2,
  COLOR_BLACK_3,
  COLOR_BLACK_4,
  COLOR_GREY_2,
  COLOR_GREY_3,
  COLOR_GREY_4,
} from 'theme/colors';

import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    background: theme.palette.type === 'dark' ? COLOR_BLACK_2 : COLOR_GREY_3,
    borderRadius: theme.spacing(1.5),
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1.25)}px`,
    border: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2}`,
    ...flexHelper('space-between'),
    '&:hover': {
      borderColor: theme.palette.type === 'dark' ? COLOR_BLACK_4 : COLOR_GREY_4,
    },
  },
  titleIconContainer: {
    ...flexHelper(),
    '& > *': {
      '&:first-child': {
        marginRight: theme.spacing(2),
        '& > *': {
          fill: COLOR_BLACK_4,
        },
      },
    },
  },
}));
