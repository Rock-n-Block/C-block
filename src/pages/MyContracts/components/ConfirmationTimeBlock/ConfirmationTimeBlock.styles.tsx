import { makeStyles, Theme, createStyles } from '@material-ui/core';

import { COLOR_ACID_GREEN, COLOR_ERROR } from 'theme/colors';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  confirmationTimeBlockContent: {
    ...flexHelper('flex-start'),
    margin: 'auto 0',
    '& > :nth-child(1)': {
      marginRight: theme.spacing(1.5),
    },
  },
  timerText: {
    color: theme.palette.type === 'dark' ? COLOR_ACID_GREEN : COLOR_ERROR,
  },
}));
