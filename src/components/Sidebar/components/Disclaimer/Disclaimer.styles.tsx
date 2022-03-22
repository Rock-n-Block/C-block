import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    border: `1px solid ${theme.palette.primary.light}`,
    background: theme.palette.secondary.light,
    boxSizing: 'border-box',
    borderRadius: '12px',
    padding: theme.spacing(2),
  },
  link: {
    textDecoration: 'underline',
  },
}));
