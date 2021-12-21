import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { COLOR_ACID_GREEN, COLOR_BLACK_2, COLOR_BLACK_3 } from 'theme/colors';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  disclaimerContainer: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    marginTop: 6,
    marginRight: theme.spacing(1.25),
    background: theme.palette.type === 'dark' ? COLOR_ACID_GREEN : COLOR_BLACK_2,
    flexShrink: 0,
  },
  disclaimerControls: {
    marginTop: theme.spacing(3),
  },
  acceptButton: {
    marginRight: theme.spacing(2.5),
  },
  cancelButton: {
    borderColor: COLOR_BLACK_3,
  },
  button: {
    width: 150,
    [theme.breakpoints.down('sm')]: {
      width: `calc(50% - ${theme.spacing(2.5)}px)`,
    },
  },
}));
