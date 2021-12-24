/* eslint-disable */
import { makeStyles } from '@material-ui/core';
import {COLOR_BLACK_SCALE_5} from "theme/colors";
import {flexHelper} from "../../utils";

export const useStyles = makeStyles({
  loaderModal: {
    background: 'transparent',
  },
  root: {
    position: 'fixed',
    background: COLOR_BLACK_SCALE_5,
    top: 0,
    left: 0,
    zIndex: 999,
    width: '100%',
    height: '100%',
  },

  loader: {
    zIndex: 999,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    ...flexHelper(),
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
    zIndex: 999,
    position: 'relative',
    top: '-5px',
    animation: '$rotating 2s linear infinite',
  },
});
