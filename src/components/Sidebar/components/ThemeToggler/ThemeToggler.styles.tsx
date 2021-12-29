import { makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import { theme } from 'theme';

import { flexHelper } from 'utils';

export const useStyles = makeStyles(() => createStyles({
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
