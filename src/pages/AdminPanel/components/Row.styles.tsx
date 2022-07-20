import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_BLACK_2,
  COLOR_BLACK_3,
  COLOR_BLACK_4,
  COLOR_GREY_2,
  COLOR_GREY_3,
  COLOR_GREY_5,
  COLOR_BLACK_7,
  COLOR_ACID_GREEN,
} from 'theme/colors';
import { getFormatMedia } from 'theme/utils';
import { flexHelper } from 'utils';

export const useStyles = makeStyles<Theme, { hasPermissions: boolean; isExpanded: boolean }>((theme) => {
  const formatMedia = getFormatMedia(theme);
  return createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(1),
      padding: 0,
      overflowX: 'auto',
      background: theme.palette.type === 'dark' ? COLOR_BLACK_2 : COLOR_GREY_2,
      border: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_3}`,
      borderRadius: theme.spacing(1.5),
    },
    head: {
      display: 'flex',
      padding: 0,
      alignItems: 'center',
      '& > :first-child': {
        width: '100%',
        overflowX: 'auto',
        '& > :first-child': {
          padding: 0,
          alignItems: 'center',
        },
      },
    },
    collapseCell: {
      padding: theme.spacing(0, 2),
      background: theme.palette.type === 'dark' ? COLOR_BLACK_2 : COLOR_GREY_2,
      overflow: 'hidden',
    },
    collapseBox: {
      padding: '32px 0',
    },
    collapseContentTitle: {
      color: theme.palette.type === 'dark' ? COLOR_BLACK_4 : COLOR_GREY_5,
    },
    collapseIconBtn: {
      '& svg': {
        fill: ({ isExpanded }) => (!isExpanded ? 'currentColor' : COLOR_ACID_GREEN),
      },
    },
    rowText: {
      fontSize: '14px',
      lineHeight: '24px',
    },
    userNameBox: {
      '& p': {
        fontSize: '14px !important',
        lineHeight: '24px !important',
      },
    },
    copyableIcon: {
      paddingLeft: theme.spacing(4),
    },
    actionCol: {
      ...flexHelper('flex-end', 'center'),
      [formatMedia.BREAKPOINT_DESKTOP]: {
        ...flexHelper('space-between', 'center'),
      },
      '& :not(:last-child)': {
        marginRight: theme.spacing(2),
      },
    },
    textField: {
      background: theme.palette.type === 'dark' ? COLOR_BLACK_7 : COLOR_GREY_3,
    },
    permissionsIconBtn: {
      border: ({ hasPermissions }) => (hasPermissions ? `1px solid ${COLOR_ACID_GREEN}` : `1px solid ${COLOR_BLACK_4}`),
      '& svg > path': {
        fill: ({ hasPermissions }) => (hasPermissions ? COLOR_ACID_GREEN : COLOR_BLACK_4),
      },
    },

    loader: {
      position: 'absolute',
      '& svg *': {
        fill: 'unset !important',
      },
    },
  });
});
