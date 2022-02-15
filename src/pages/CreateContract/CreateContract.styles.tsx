import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  testnetSwitcher: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme.palette.primary.main,
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1.5),
    height: theme.spacing(7),
    marginBottom: theme.spacing(3),
    border: `1px solid ${theme.palette.primary.light}`,
  },
}));
