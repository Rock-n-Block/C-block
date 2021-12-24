import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { COLOR_GREEN } from 'theme/colors';

export const useStyles = makeStyles<Theme, { railLeftMargin: number; railWidth: number;}>(() => createStyles({
  rail: {
    '&:before': {
      position: 'absolute',
      top: 0,
      left: ({ railLeftMargin = 0 }) => `${railLeftMargin}%`,
      content: '""',
      background: COLOR_GREEN,
      height: '100%',
      width: ({ railWidth }) => `${railWidth}%`,
      borderTopLeftRadius: ({ railLeftMargin = 0 }) => `${railLeftMargin > 0 ? '0' : 'inherit'}`,
      borderTopRightRadius: ({ railLeftMargin = 0 }) => `${railLeftMargin > 0 ? 'inherit' : '0'}`,
      borderBottomRightRadius: ({ railLeftMargin = 0 }) => `${railLeftMargin > 0 ? 'inherit' : '0'}`,
      bordeBottomLeftRadius: ({ railLeftMargin = 0 }) => `${railLeftMargin > 0 ? '0' : 'inherit'}`,
    },
  },
}));
