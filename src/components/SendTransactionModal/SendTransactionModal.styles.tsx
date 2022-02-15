import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { COLOR_BLACK_1, COLOR_GREY } from 'theme/colors';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  textContainer: {
    ...flexHelper('center', 'center'),
  },
  desc: {
    maxWidth: '70%',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    color: theme.palette.type === 'dark' ? COLOR_GREY : COLOR_BLACK_1,
    textTransform: 'none',
  },
}));
