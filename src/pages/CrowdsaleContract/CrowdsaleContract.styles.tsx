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
    padding: `${theme.spacing(5)}px 0px`,
  },
  shortInput: {
    minWidth: theme.palette.type === 'dark' ? '190px' : '190px',
    width: `${theme.palette.type === 'dark' ? '40%' : '40%'} !important`,
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
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    background: theme.palette.type === 'dark' ? COLOR_BLACK_1 : COLOR_GREY_2,
    borderRadius: theme.spacing(2.5),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
    },
  },

  changingDatesHeader: {
    ...flexHelper('space-between', 'center'),
    marginBottom: theme.spacing(3),
  },

  changingDatesTitle: {
    ...flexHelper('flex-start', 'flex-start'),
    color: theme.palette.type === 'dark' ? COLOR_GREY_1 : COLOR_BLACK_1,
  },
}));
