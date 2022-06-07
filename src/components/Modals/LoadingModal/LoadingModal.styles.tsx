import { makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme) => createStyles({
  icon: {
    ...flexHelper(),
    flexDirection: 'column',
  },
  desc: {
    marginTop: theme.spacing(3),
    maxWidth: '80%',
    textAlign: 'center',
    whiteSpace: 'break-spaces',
    textTransform: 'unset',
  },
}));
