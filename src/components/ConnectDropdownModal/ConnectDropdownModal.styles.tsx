import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { COLOR_ACID_GREEN, COLOR_BLACK_3 } from 'theme/colors';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  connectBtn: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    borderRadius: theme.spacing(4.5),
    border: `1px solid ${COLOR_BLACK_3}`,
    boxSizing: 'border-box',
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
