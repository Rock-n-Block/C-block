import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_BLACK_2,
  COLOR_BLACK_3,
  COLOR_GREY_2,
  COLOR_GREY_3,
} from 'theme/colors';

import { getFormatMedia } from 'theme/utils';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => {
  const formatMedia = getFormatMedia(theme);

  return createStyles({
    root: {
      [formatMedia.BREAKPOINT_TABLET]: {
      },
    },
    paymentInfo: {
      ...flexHelper('space-between'),
      border: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2}`,
      background: theme.palette.type === 'dark' ? COLOR_BLACK_2 : COLOR_GREY_3,
      borderRadius: theme.spacing(1.5),
      padding: `${theme.spacing(0.675)}px ${theme.spacing(0)}px`,
      margin: `${theme.spacing(2)}px 0px ${theme.spacing(4)}px 0px`,
      width: 'unset',
      minWidth: 500,
      [theme.breakpoints.down('xs')]: {
        minWidth: 'unset',
      },
    },
    paymentInfoHelper: {
      ...flexHelper('space-between'),
      minWidth: 500,
      padding: `0px ${theme.spacing(8)}px 0px ${theme.spacing(3)}px`,
      [theme.breakpoints.down('xs')]: {
        minWidth: 'unset',
      },
    },
    paymentInfoIcon: {
      ...flexHelper('flex-start'),
      '& > *': {
        '&:first-child': {
          marginRight: theme.spacing(1.5),
        },
      },
    },
    paymentControls: {
      ...flexHelper('flex-end', 'center'),
    },
    payButton: {
      marginRight: theme.spacing(3),
    },
    cancelButton: {},
    button: {},
    selectBuyToken: {
      maxHeight: `${theme.spacing(4)}px`,
    },
    selectMenuBuyToken: {
      padding: theme.spacing(1, 2),
      borderRadius: '26px !important',
    },
  });
});
