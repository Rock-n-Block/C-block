import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_BLACK_3,
} from 'theme/colors';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    minHeight: 100,
    width: '100%',
    paddingTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingTop: theme.spacing(4),
    },
  },
  breadcrumbsAndConnect: {
    flexDirection: 'column-reverse',
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(3),
    },
  },
  titleAndChaintag: {
    marginTop: theme.spacing(2),
  },
  title: {
    ...flexHelper('flex-start'),
    '& > *': {
      '&:first-child': {
        marginRight: theme.spacing(2),
      },
    },
  },
  breadcrumbs: {
    ...flexHelper('flex-start'),
  },

  chainTag: {
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      margin: 'unset',
    },
  },
  headerLogo: {
    display: 'none',
    [theme.breakpoints.down(768)]: {
      ...flexHelper('space-between'),
      width: '100%',
      paddingBottom: theme.spacing(4),
      borderBottom: `1px solid ${COLOR_BLACK_3}`,
      marginBottom: theme.spacing(4),
    },
  },
}));
