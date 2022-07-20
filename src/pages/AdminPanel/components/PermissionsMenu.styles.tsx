import { makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import {
  COLOR_BLACK_3,
  COLOR_GREY_2,
  COLOR_GREY_3,
  COLOR_BLACK_7,
  COLOR_ACID_GREEN,
} from 'theme/colors';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme) => createStyles({
  permissionsMenuPaper: {
    background: theme.palette.type === 'dark' ? COLOR_BLACK_7 : COLOR_GREY_3,
    border: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2}`,
    borderRadius: theme.spacing(1),
  },
  permissionsMenuListRoot: {
    width: 210,
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
    marginLeft: theme.spacing(1),
    fontSize: '14px',
    lineHeight: '24px',
    whiteSpace: 'break-spaces',
  },
}));
