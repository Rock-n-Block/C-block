import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';

import { flexHelper } from 'utils';
import { getStylesConstants } from './SideBar.constants';

export const useStyles = makeStyles((theme: Theme) => {
  const { SIDEBAR_CONTAINER_PADDING } = getStylesConstants(theme);

  const marginBottom = {
    marginBottom: theme.spacing(3),
  };

  return createStyles({
    root: {
      ...flexHelper('space-between', 'flex-start'),
      flexDirection: 'column',
      padding: SIDEBAR_CONTAINER_PADDING,
      background: theme.palette.primary.main,
    },
    contentWrapper: {
      width: '100%',
    },
    sidebarHead: {
      ...flexHelper('space-between'),
      marginTop: theme.spacing(1),
      ...marginBottom,
    },
    sidebarDisclaimer: {
      ...marginBottom,
    },
    sidebarCloseBtn: {
      display: 'none',
      [theme.breakpoints.down(768)]: {
        display: 'block',
      },
    },
  });
});
