import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_BLACK_1,
  COLOR_BLACK_3,
  COLOR_BUTTON_PRIMARY_LIGHT_DEFAULT,
  COLOR_BUTTON_SECONDARY_LIGHT_DEFAULT, COLOR_GREY_3,
  COLOR_ACID_GREEN,
} from 'theme/colors';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '90%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  search: {
    width: '100%',
    padding: theme.spacing(1.25),
  },
  emptyContractBlock: {
    width: '100%',
  },
  contractBlock: {
    ...flexHelper(),
    width: '100%',
    margin: theme.spacing(1),
    borderRadius: theme.spacing(2),
    border: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_3}`,
    flexDirection: 'column',
    background: theme.palette.type === 'dark' ? COLOR_BLACK_1 : COLOR_BUTTON_PRIMARY_LIGHT_DEFAULT,
  },
  contractHead: {
    ...flexHelper('space-between'),
    width: '100%',
    padding: theme.spacing(4, 4, 0, 3),
  },
  contractTitle: {
    ...flexHelper('flex-start'),
    padding: theme.spacing(2, 3),
    width: '100%',
    '& > :nth-child(1)': {
      marginRight: theme.spacing(2),
    },
  },
  contractBottom: {
    ...flexHelper('space-between'),
    padding: theme.spacing(3),
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      ...flexHelper('flex-start', 'flex-start'),
    },
  },
  contractButtons: {
    ...flexHelper('flex-start'),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      width: '100%',
      '&:not(:last-child)': {
        marginBottom: theme.spacing(2),
      },
    },
  },
  contractButtonsRightColumn: {
    justifyContent: 'flex-end',
  },
  contractActionBlockInner: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '&:last-child': {
      alignItems: 'flex-end',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      '&:last-child': {
        alignItems: 'unset',
      },
      '&:not(:last-child)': {
        marginBottom: theme.spacing(3),
      },
    },
  },
  contractActionText: {
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(2),
    },
  },
  chainTag: {
    ...flexHelper(),
    [theme.breakpoints.down('sm')]: {
      margin: 'unset',
    },
  },
  contractDate: {
    width: '100%',
    paddingLeft: theme.spacing(3),
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
    '&:hover svg': {
      fill: theme.palette.type === 'dark' ? COLOR_BLACK_1 : COLOR_BLACK_1,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginRight: '0px !important',
      '&:not(:last-child)': {
        marginBottom: theme.spacing(2),
      },
    },
  },
  flameIcon: {
    fill: theme.palette.type === 'dark' ? COLOR_ACID_GREEN : COLOR_BLACK_1,
  },
  successfulAdditionalContent: {
    ...flexHelper('flex-start'),
  },
  successfulAdditionalContentText: {
    marginLeft: theme.spacing(2),
  },
}));
