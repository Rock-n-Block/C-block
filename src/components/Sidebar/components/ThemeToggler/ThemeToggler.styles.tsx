import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';

import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    ...flexHelper('space-between'),
  },
  leftSide: {
    display: 'flex',
  },
  text: {
    paddingLeft: theme.spacing(2),
  },
}));
