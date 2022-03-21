import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { COLOR_LAYOUT_BACKGROUND_DARK, COLOR_LAYOUT_BACKGROUND_LIGHT } from 'theme/colors';

export const useStyles = makeStyles<Theme, { isSidebarOpen: boolean }>(
  (theme: Theme) => createStyles({
    root: {
      position: 'relative',
      width: '100%',
      display: 'flex',
      background: theme.palette.type === 'dark' ? COLOR_LAYOUT_BACKGROUND_DARK : COLOR_LAYOUT_BACKGROUND_LIGHT,
    },
    sidebar: {
      position: 'sticky',
      top: 0,
      zIndex: 999,
      minWidth: 240,
      maxWidth: 240,
      flexBasis: '25%',
      transition: '300ms',
      [theme.breakpoints.down(768)]: {
        position: 'fixed',
        left: ({ isSidebarOpen }) => (isSidebarOpen ? '0%' : '-150%'),
        height: '100vh',
        maxWidth: 'unset',
        width: '100%',
      },
    },
    content: {
      flex: 1,
      minWidth: 0,
      flexBasis: '75%',
      paddingBottom: theme.spacing(10),
      minHeight: '100vh',
      overflow: 'hidden',
      position: 'relative',
      [theme.breakpoints.down(768)]: {
        paddingLeft: '0',
        flexBasis: '100%',
        height: ({ isSidebarOpen }) => (isSidebarOpen ? '100vh' : 'unset'),
      },
    },
    children: {
      position: 'relative',
      zIndex: 1,
    },
    particleCanvas: {
      // @ts-expect-error position is not allowed !important
      position: 'fixed !important',
      width: '100%',
      height: '100vh ',
      overflow: 'hidden',
    },
    greenBlob: {
      position: 'absolute',
      zIndex: 0,
      top: 0,
      right: 0,
      transform: 'translate3d(50%, 25%, 0)',
      width: '1176px',
      height: '1176px',
    },
  }),
);
