import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { COLOR_ACID_GREEN, COLOR_LAYOUT_BACKGROUND_DARK, COLOR_LAYOUT_BACKGROUND_LIGHT } from 'theme/colors';

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
      height: '100vh',
      transition: theme.transitions.create(['transform'], {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeOut,
      }),
      [theme.breakpoints.down(768)]: {
        position: 'fixed',
        transform: ({ isSidebarOpen }) => `translate3d(${isSidebarOpen ? '0%' : '-150%'}, 0, 0)`,
        height: '100%',
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
    greenBlob: {
      zIndex: -1,
      position: 'absolute',
      width: '25vw',
      height: '25vh',
      background: COLOR_ACID_GREEN,
      right: '-12.5vh',
      top: 'calc(100vh - 12.5vh)',
      filter: 'blur(400px)',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  }),
);
