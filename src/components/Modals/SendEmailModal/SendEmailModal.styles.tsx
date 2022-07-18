import { makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import { COLOR_BLACK_4, COLOR_GREY_4 } from 'theme/colors';

import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme) => createStyles({
  root: {
    '& > * > *': {
      width: '100%',
    },
  },
  inputContainer: {
    ...flexHelper('space-between'),
    width: '100%',
    '&:not(:last-child)': {
      paddingBottom: theme.spacing(3),
    },
  },
  title: {
    ...flexHelper('flex-start', 'flex-start'),
    flexDirection: 'column',
    maxWidth: 290,
  },
  buttonsContainer: {
    ...flexHelper('flex-start', 'center'),
    '& :not(:last-child)': {
      marginRight: theme.spacing(2),
      width: 150,
    },
  },
  button: {
    textTransform: 'none',
  },
  showPasswordBtn: {
    color: theme.palette.type === 'dark' ? COLOR_BLACK_4 : COLOR_GREY_4,
    '&:hover': {
      color: theme.palette.type === 'dark' ? COLOR_BLACK_4 : COLOR_GREY_4,
    },
  },
}));
