import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { COLOR_BLACK_1 } from 'theme/colors';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '90%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  contractBlock: {
    ...flexHelper(),
    padding: `${theme.spacing(3)}px ${theme.spacing(4)}px`,
    borderRadius: 16,
    flexDirection: 'column',
    background: COLOR_BLACK_1,
  },
  contractHead: {
    ...flexHelper('space-between'),
    width: '100%',
  },
  contractTitle: {
    ...flexHelper('flex-start'),
    padding: `${theme.spacing(3)}px 0px`,
    width: '100%',
    '& > :nth-child(1)': {
      marginRight: theme.spacing(2),
    },
  },
  contractBottom: {
    ...flexHelper('flex-start'),
    flexWrap: 'nowrap',
  },
  chainTag: {
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      margin: 'unset',
    },
  },
}));
