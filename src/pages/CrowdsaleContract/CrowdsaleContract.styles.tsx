import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_BLACK_1,
  COLOR_BLACK_3, COLOR_GREY_1, COLOR_GREY_2, COLOR_GREY_5,
} from 'theme/colors';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  form: {
    width: '90%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  crowdsaleContractFormSection: {
    borderTop: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_5}`,
    padding: theme.spacing(5, 0),
  },
  shortTextField: {
    maxWidth: '50%',
  },
  submitButton: {
    width: '150px !important',
    marginRight: theme.spacing(2.5),
  },
  resetButton: {
    width: '150px !important',
  },

  helperText: {
    marginTop: theme.spacing(4),
  },

  changingDates: {
    padding: theme.spacing(2, 3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3, 2),
    },
    background: theme.palette.type === 'dark' ? COLOR_BLACK_1 : COLOR_GREY_2,
    borderRadius: theme.spacing(2.5),
    marginBottom: theme.spacing(4),

  },

  changingDatesHeader: {
    ...flexHelper('space-between'),
    marginBottom: theme.spacing(3),
  },

  changingDatesTitle: {
    ...flexHelper('flex-start', 'flex-start'),
    color: theme.palette.type === 'dark' ? COLOR_GREY_1 : COLOR_BLACK_1,
  },
}));
