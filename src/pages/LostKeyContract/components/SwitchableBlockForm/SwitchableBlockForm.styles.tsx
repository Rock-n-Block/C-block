import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { COLOR_BLACK_1, COLOR_GREY_1, COLOR_GREY_2 } from 'theme/colors';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
    background: theme.palette.type === 'dark' ? COLOR_BLACK_1 : COLOR_GREY_2,
    borderRadius: theme.spacing(2.5),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
    },
  },
  header: {
    ...flexHelper('space-between'),
    marginBottom: theme.spacing(1),
  },

  title: {
    ...flexHelper('flex-start', 'flex-start'),
    color: theme.palette.type === 'dark' ? COLOR_GREY_1 : COLOR_BLACK_1,
  },

  description: {
    maxWidth: '50%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },

    marginBottom: theme.spacing(4),
  },
}));
