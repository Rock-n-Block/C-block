import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { COLOR_ACID_GREEN, COLOR_ERROR } from 'theme/colors';

import { flexHelper } from 'utils';

export const useStyles = makeStyles<Theme, { yes: boolean }>((theme: Theme) => createStyles({
  root: {
    ...flexHelper(),
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    marginRight: theme.spacing(1.5),
    background: ({ yes }) => (yes ? COLOR_ACID_GREEN : COLOR_ERROR),
  },
}));
