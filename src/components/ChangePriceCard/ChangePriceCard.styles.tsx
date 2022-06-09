import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_ACID_GREEN, COLOR_BLACK_1, COLOR_BLACK_4,
} from 'theme/colors';
import { FontWeights } from 'theme/Typography';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2.25),
    background: theme.palette.primary.main,
    borderRadius: theme.spacing(2),
    border: `1px solid ${theme.palette.secondary.light}`,
    '&:hover': {
      border: `1px solid ${COLOR_ACID_GREEN}`,
    },
    transition: theme.transitions.create(['border'], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeOut,
    }),
  },
  header: {
    marginBottom: theme.spacing(3.625),
  },
  currency: {
    color: theme.palette.type === 'dark' ? COLOR_ACID_GREEN : COLOR_BLACK_1,
    fontWeight: FontWeights.fontWeightRegular,
    letterSpacing: '-0.5px',
    textTransform: 'uppercase',
    marginRight: theme.spacing(1),
  },
  fieldLabel: {
    color: theme.palette.type === 'dark' ? COLOR_BLACK_4 : COLOR_BLACK_1,
    marginBottom: theme.spacing(1),
  },
  field: {
    '& input': { padding: theme.spacing(1.5) },
    '& > ': { '&:first-child': { height: theme.spacing(6), width: '45%' } },
  },
}));
