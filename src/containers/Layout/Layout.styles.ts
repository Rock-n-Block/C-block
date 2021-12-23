import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { COLOR_ACID_GREEN, COLOR_LAYOUT_BACKGROUND_DARK, COLOR_LAYOUT_BACKGROUND_LIGHT } from 'theme/colors';

export const useStyles = makeStyles<Theme, { isSidebarOpen: boolean }>(
  (theme: Theme) => createStyles({
    root: {
      overflow: 'hidden',
      position: 'relative',
      zIndex: 2,
      width: '100%',
      display: 'flex',
      background: theme.palette.type === 'dark' ? COLOR_LAYOUT_BACKGROUND_DARK : COLOR_LAYOUT_BACKGROUND_LIGHT,
    },
    sidebar: {
      position: 'sticky',
      top: 0,
      zIndex: 999,
      minWidth: 250,
      maxWidth: 350,
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
