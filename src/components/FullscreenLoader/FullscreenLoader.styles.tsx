import { makeStyles } from '@material-ui/core';
import { COLOR_BLACK_SCALE_5 } from 'theme/colors';

export const useStyles = makeStyles({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 9999,
    width: '100%',
    height: '100%',
    background: COLOR_BLACK_SCALE_5,
  },
});
