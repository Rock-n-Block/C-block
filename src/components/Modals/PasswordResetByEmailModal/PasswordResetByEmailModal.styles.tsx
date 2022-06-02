import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';

import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  inputContainer: {
    ...flexHelper('space-between'),
    width: '100%',
    '&:not(:last-child)': {
      paddingBottom: theme.spacing(3),
    },
  },
  title: {
    ...flexHelper('flex-start', 'flex-start'),
    flexDirection: 'column',
    maxWidth: 290,
  },
  buttonsContainer: {
    ...flexHelper('flex-start', 'center'),
  },
  button: {
    textTransform: 'none',
  },
}));
