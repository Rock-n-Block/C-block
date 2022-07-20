import { makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import {
  COLOR_BLACK_3,
  COLOR_GREY_2,
} from 'theme/colors';

export const useStyles = makeStyles((theme) => createStyles({
  head: {
    marginBottom: theme.spacing(2),
    paddingBottom: 0,
    borderBottom: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2}`,

    display: 'flex',
    padding: theme.spacing(0, 2),
    alignItems: 'center',
    '& > :first-child': {
      width: '100%',
    },

    '& > :last-child': {
      width: 48,
    },
  },
}));
