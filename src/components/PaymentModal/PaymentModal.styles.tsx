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
      padding: `${theme.spacing(1)}px ${theme.spacing(2.5)}px`,
      minWidth: 200,
    },
    paymentInfoIcon: {
      ...flexHelper(),
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

    },
    cancelButton: {

    },
    button: {},
  });
});
