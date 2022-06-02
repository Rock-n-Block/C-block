import { makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

import {
  COLOR_ACID_GREEN,
  COLOR_BLACK_3, COLOR_BLACK_4, COLOR_BLACK_5,
  COLOR_GREY, COLOR_GREY_2, COLOR_GREY_4, COLOR_GREY_6,
} from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme) => createStyles({
  title: {
    ...flexHelper('flex-start', 'flex-start'),
    flexDirection: 'column',
    maxWidth: 290,
  },
  tabsContainer: {
    ...flexHelper('flex-start'),
    marginBottom: theme.spacing(4),
  },
  tabButton: {
    height: 44,
    fontSize: '20px !important',
    lineHeight: '32px !important',
    fontWeight: FontWeights.fontWeightSemiBold,
    '&:not(:last-child)': {
      marginRight: theme.spacing(1),
    },
  },
  tabButtonNotActive: {
    backgroundColor: theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2,
    color: theme.palette.type === 'dark' ? COLOR_GREY : COLOR_BLACK_5,
  },
  inputContainer: {
    ...flexHelper('space-between'),
    width: '100%',
    '&:not(:last-child)': {
      paddingBottom: theme.spacing(4),
    },
  },

  buttonsContainer: {
    ...flexHelper('flex-start', 'center'),
    flexDirection: 'column',
    marginTop: theme.spacing(4),
    '& > :not(:last-child)': {
      marginBottom: theme.spacing(2),
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
  link: {
    textDecoration: 'underline',
    color: theme.palette.type === 'dark' ? COLOR_ACID_GREEN : COLOR_GREY_6,
  },
  disclaimer: {
    maxWidth: 243,
    marginTop: theme.spacing(5),
  },
  textButton: {
    display: 'flex',
    padding: 0,
  },
  walletContainer: {
    borderRadius: theme.spacing(4),
    border: `1px solid ${theme.palette.type === 'dark' ? COLOR_ACID_GREEN : COLOR_GREY_6}`,

    '& > svg': {
      fill: theme.palette.type === 'dark' ? COLOR_ACID_GREEN : COLOR_GREY_6,
    },
  },
}));
