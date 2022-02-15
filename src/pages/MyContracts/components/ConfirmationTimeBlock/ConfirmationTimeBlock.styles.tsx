import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  confirmationTimeBlockContent: {
    ...flexHelper('flex-start'),
    margin: 'auto 0',
    '& > :nth-child(1)': {
      marginRight: theme.spacing(1.5),
    },
  },
}));
