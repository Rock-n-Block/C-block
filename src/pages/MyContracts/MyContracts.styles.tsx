import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_BLACK_1,
  COLOR_BLACK_3,
  COLOR_BUTTON_PRIMARY_LIGHT_DEFAULT,
  COLOR_BUTTON_SECONDARY_LIGHT_DEFAULT, COLOR_GREY_4,
} from 'theme/colors';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '90%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  contractBlock: {
    ...flexHelper(),
    padding: theme.spacing(0),
    margin: theme.spacing(1),
    borderRadius: 16,
    flexDirection: 'column',
    background: theme.palette.type === 'dark' ? COLOR_BLACK_1 : COLOR_BUTTON_PRIMARY_LIGHT_DEFAULT,
  },
  contractHead: {
    ...flexHelper('space-between'),
    width: '100%',
    padding: `${theme.spacing(4)}px ${theme.spacing(4)}px 0px ${theme.spacing(4)}px`,
  },
  contractTitle: {
    ...flexHelper('flex-start'),
    padding: `${theme.spacing(3)}px`,
    width: '100%',
    '& > :nth-child(1)': {
      marginRight: theme.spacing(2),
    },
  },
  contractBottom: {
    ...flexHelper('space-between'),
    padding: theme.spacing(3),
    flexWrap: 'nowrap',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  contractButtons: {
    ...flexHelper('flex-start'),
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  contractActionBlock: {
    ...flexHelper('space-between'),
    padding: `${theme.spacing(1.5)}px ${theme.spacing(3)}px`,
    width: '100%',
    background: theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_4,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      '& > p': {
        paddingBottom: theme.spacing(4),
      },
    },
  },
  chainTag: {
    margin: '0 auto',
    height: 40,
    background: theme.palette.type === 'dark' ? '' : COLOR_BLACK_3,
    [theme.breakpoints.down('sm')]: {
      margin: 'unset',
    },
  },
  chainTagContainer: {
    [theme.breakpoints.down('sm')]: {
      margin: 'unset',
      paddingLeft: '0',
      paddingBottom: theme.spacing(4),
      width: '100%',
      ...flexHelper('flex-start'),
    },
  },
  button: {
    height: 56,
    fontSize: 18,
    minWidth: 141,
    background: theme.palette.type === 'dark' ? COLOR_BLACK_1 : COLOR_BUTTON_SECONDARY_LIGHT_DEFAULT,
    textTransform: 'none',
    '&:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginRight: 0,
      '&:not(:last-child)': {
        marginBottom: theme.spacing(2),
      },
    },
  },
  actionButton: {
    borderColor: theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_BUTTON_SECONDARY_LIGHT_DEFAULT,
  },
}));
