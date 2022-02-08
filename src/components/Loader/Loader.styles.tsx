import { makeStyles, Theme } from '@material-ui/core';
import { animationsHelper, flexHelper } from 'utils';

export const useStyles = makeStyles<Theme, { width: string }>({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    ...flexHelper(),
  },

  ...animationsHelper.rotating,

  icon: {
    position: 'relative',
    top: '-5px',
    width: ({ width }) => width,
    height: 'auto',
    animation: '$rotating 2s linear infinite',
  },
});
