import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_ACID_GREEN, COLOR_BLACK_3, COLOR_BLACK_4,
} from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  addressBtn: {
    marginBottom: theme.spacing(1.5),
    height: 40,
  },
  btnItem: {
    color: theme.palette.type === 'dark' ? COLOR_BLACK_4 : COLOR_ACID_GREEN,
    fontWeight: FontWeights.fontWeightSemiBold,
    lineHeight: '24px',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
  connectBtn: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    borderRadius: theme.spacing(4.5),
    border: `1px solid ${COLOR_BLACK_3}`,
    cursor: 'pointer',
    '&:hover': {
      borderColor: COLOR_ACID_GREEN,
    },
    marginBottom: theme.spacing(1),
  },
  walletIcon: {
    marginRight: theme.spacing(1),
  },
  disconnectBox: {
    ...flexHelper(),
    flexDirection: 'column',
  },
  disconnectTitle: {
    maxWidth: 150,
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  },
}));
