import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { COLOR_ACID_GREEN, COLOR_ERROR } from 'theme/colors';

export const useStyles = makeStyles<Theme, { isTestnet: boolean }>((theme: Theme) => createStyles({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(3),
    overflow: 'hidden',
    width: 'fit-content',
    '&:before': {
      content: "''",
      position: 'absolute',
      left: 0,
      background: ({ isTestnet }) => (isTestnet ? COLOR_ERROR : COLOR_ACID_GREEN),
      opacity: 0.1,
      width: '100%',
      height: '100%',
    },
  },
  dot: {
    position: 'relative',
    width: 8,
    height: 8,
    background: ({ isTestnet }) => (isTestnet ? COLOR_ERROR : COLOR_ACID_GREEN),
    borderRadius: '50%',
    marginRight: theme.spacing(1),
  },
  text: {
    position: 'relative',
    color: ({ isTestnet }) => (isTestnet ? COLOR_ERROR : COLOR_ACID_GREEN),
  },
}));
