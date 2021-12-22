/* eslint-disable */
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  loaderModal: {
    background: 'transparent',
  },
  root: {
    position: 'fixed',
    background: 'rgba(0, 0, 0, .5)',
    top: 0,
    left: 0,
    zIndex: 9999999999999999999,
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

  loader: {
    zIndex: 9999999999999999999,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  '@keyframes rotating': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },

  icon: {
    width: '100px',
    height: 'auto',
    zIndex: 9999999999999999999,
    // animation: 'imageFloating 1s linear infinite',
    position: 'relative',
    top: '-5px',
    // '@keyframes rotating': {
    //   from: {
    //     transform: 'rotate(0deg)',
    //   },
    //   to: {
    //     transform: 'rotate(360deg)',
    //   },
    // },
    animation: '$rotating 2s linear infinite',
  },
});
