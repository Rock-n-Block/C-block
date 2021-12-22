import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { COLOR_BLACK_4, COLOR_ACID_GREEN, COLOR_GREY_4 } from 'theme/colors';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
    borderRadius: theme.spacing(1.5),
    border: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_4 : COLOR_GREY_4}`,
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
    },
  },
  title: {
    ...flexHelper('flex-start', 'flex-start'),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    '& > svg': {
      fill: COLOR_ACID_GREEN,
    },
  },
  titleText: {
    color: COLOR_ACID_GREEN,
  },
}));
