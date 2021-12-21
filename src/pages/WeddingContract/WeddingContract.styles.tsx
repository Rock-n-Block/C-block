import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_BLACK_1, COLOR_BLACK_3, COLOR_BLACK_4, COLOR_GREY_1, COLOR_GREY_2, COLOR_GREY_5,
} from 'theme/colors';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  form: {
    width: '90%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  tokenContractFormSection: {
    borderTop: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_5}`,
    padding: `${theme.spacing(5)}px 0px`,
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
  newCount: {
    color: theme.palette.type === 'dark' ? COLOR_GREY_1 : COLOR_BLACK_1,
  },
  container: {
    ...flexHelper('space-between'),
    flexWrap: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },
  slider: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
    margin: theme.spacing(1),
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
    color: COLOR_BLACK_4,
  },
}));
