import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  form: {
    marginTop: theme.spacing(4),
    '& > *': {
      marginBottom: theme.spacing(4),
    },
  },
  submitButton: {
    width: '150px',
    marginRight: theme.spacing(2.5),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  resetButton: {
    width: '150px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  customDevelopmentControlsContainer: {
    ...flexHelper('flex-start'),
    [theme.breakpoints.down('xs')]: {
      ...flexHelper('center'),
    },
  },
}));
