import { makeStyles, Theme, createStyles } from '@material-ui/core';
import {
  COLOR_BLACK_3,
  COLOR_BUTTON_SECONDARY_LIGHT_DEFAULT,
} from 'theme/colors';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  actionButton: {
    borderColor:
        theme.palette.type === 'dark'
          ? COLOR_BLACK_3
          : COLOR_BUTTON_SECONDARY_LIGHT_DEFAULT,
    [theme.breakpoints.down('sm')]: {
      ...flexHelper('space-between'),
      '&:not(:last-child)': {
        marginBottom: theme.spacing(1),
      },
    },
  },
}));
