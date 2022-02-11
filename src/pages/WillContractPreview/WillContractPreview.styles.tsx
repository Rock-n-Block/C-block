import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_ACID_GREEN, COLOR_BLACK_1,
} from 'theme/colors';
import { baseFieldWidthRestriction, flexHelper, separator } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  section: {
    padding: theme.spacing(4, 0, 5),
    '&:nth-last-child(n+3)': separator(theme), // ignore 2 last childs (1 item with STAMP and 1 is just the last item)
  },
  sectionTitle: {
    paddingBottom: theme.spacing(2),
  },
  copyableContainer: {
    ...baseFieldWidthRestriction(theme),
  },
  subInfo: {
    ...flexHelper('flex-start'),
    '& > *': {
      '&:first-child': {
        marginRight: theme.spacing(4),
        color: theme.palette.type === 'dark' ? COLOR_ACID_GREEN : COLOR_BLACK_1,
      },
    },
    '&:not(:last-child)': {
      paddingBottom: theme.spacing(2),
    },
  },
  tableColumn: {
    [theme.breakpoints.down('xs')]: {
      '&:last-child': {
        marginLeft: 'auto',
      },
    },
  },
  tableColumnTitle: {
    paddingBottom: theme.spacing(1),
  },
}));
