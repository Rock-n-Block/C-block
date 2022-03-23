import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_ACID_GREEN, COLOR_GREEN,
} from 'theme/colors';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: theme.spacing(3),
    maxWidth: 700,
    background: theme.palette.primary.main,
    borderRadius: theme.spacing(2),

    textAlign: 'center',

    '& p, & h1, & h2, & h3, & h4, & ul': {
      margin: 'revert',
      padding: 'revert',
    },
    '& li': {
      listStyleType: 'revert',
    },
    '& a': {
      textDecoration: 'underline',
      color: theme.palette.type === 'dark' ? COLOR_ACID_GREEN : COLOR_GREEN,
    },
  },
}));
