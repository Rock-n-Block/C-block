import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { COLOR_BLACK_1, COLOR_GREY_2 } from 'theme/colors';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    ...flexHelper('space-between', 'center'),
    flexWrap: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },
  slider: {
    padding: '23px 19px',
    margin: '10px',
    background: theme.palette.type === 'dark' ? COLOR_BLACK_1 : COLOR_GREY_2,
    borderRadius: theme.spacing(2.5),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(5)}px ${theme.spacing(2)}px`,
    },
    width: '100%',
  },
  title: {
    ...flexHelper('space-between', 'flex-start'),
    marginBottom: theme.spacing(9),
    height: 40,
  },
  desc: {
    marginTop: theme.spacing(4),
    color: '#64656A',
  },
}));
