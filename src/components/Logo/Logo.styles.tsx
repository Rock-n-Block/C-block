import { makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import { COLOR_BLACK_4 } from 'theme/colors';

export const useStyles = makeStyles(() => createStyles({
  root: {
    position: 'relative',
    width: 'fit-content',
  },
  subLogo: {
    position: 'absolute',
    right: '-2px',
    bottom: '-10px',
    fontSize: '14px',
    lineHeight: '24px',
    letterSpacing: 0,
    color: COLOR_BLACK_4,
  },
}));
