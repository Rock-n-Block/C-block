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

export const useStyles = makeStyles((theme) => createStyles({
  head: {
    marginBottom: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2}`,
  },
  permissionsMenuPaper: {
    background: theme.palette.type === 'dark' ? COLOR_BLACK_7 : COLOR_GREY_3,
    border: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2}`,
    borderRadius: theme.spacing(1),
  },
  permissionsMenuListRoot: {
    width: 200,
    padding: theme.spacing(2),
  },
  permissionsMenuItemRoot: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    '&:hover': {
      background: 'none',
    },
  },
  permissionsMenuItemContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  permissionsMenuItemBtnGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
    '& :not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
  permissionsMenuItemCheckbox: {
    ...flexHelper('flex-start', 'flex-start'),
  },
  checkbox: {
    '&:hover': {
      color: COLOR_ACID_GREEN,
    },
    '&.Mui-checked': {
      color: COLOR_ACID_GREEN,
    },
  },
  checkBoxText: {
    fontSize: '14px',
    lineHeight: '24px',
    whiteSpace: 'break-spaces',
  },
}));
export const useRowStyles = makeStyles<Theme, { hasPermissions: boolean }>((theme) => {
  const formatMedia = getFormatMedia(theme);
  return createStyles({
    root: {
      alignItems: 'center',
      marginBottom: theme.spacing(1),
      padding: 0,
      overflowX: 'auto',
      background: theme.palette.type === 'dark' ? COLOR_BLACK_2 : COLOR_GREY_2,
      border: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_3}`,
      borderRadius: theme.spacing(1.5),
    },
    head: {
      marginBottom: theme.spacing(3),
      borderBottom: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2}`,
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
      marginLeft: theme.spacing(2),
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
      '& > div:first-child': {
        ...flexHelper('flex-start', 'center'),
        '& :not(:last-child)': {
          marginRight: theme.spacing(2),
        },
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
  });
});
