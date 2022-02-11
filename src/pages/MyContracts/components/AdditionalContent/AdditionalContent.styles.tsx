import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { COLOR_BLACK_3, COLOR_GREY_4 } from 'theme/colors';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  contractActionBlock: {
    ...flexHelper('space-between', 'flex-start'),
    padding: theme.spacing(1.5, 3),
    width: '100%',
    background: theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_4,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}));
