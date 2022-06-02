import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_BLACK_4, COLOR_GREY_3, COLOR_GREY_4, COLOR_ACID_GREEN, COLOR_GREY_6, COLOR_BLACK_2,
} from 'theme/colors';
import { FontWeights } from 'theme/Typography';

import { getFormatMedia } from 'theme/utils';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => {
  const formatMedia = getFormatMedia(theme);

  return createStyles({
    root: {
      width: '100%',
      [formatMedia.BREAKPOINT_TABLET]: {
      },
    },
    addressButton: {
      width: '100%',
      [formatMedia.BREAKPOINT_TABLET]: {
        maxWidth: 350,
      },
    },
    connectButton: {
      width: 132,
      height: 48,
      fontSize: '14px !important',
      lineHeight: '22px',
      fontWeight: FontWeights.fontWeightMedium,
    },
    signOutIconButton: {
      marginLeft: theme.spacing(1),
    },
    signOutButton: {
      marginTop: theme.spacing(1),
      border: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_4 : COLOR_GREY_4}`,
      color: theme.palette.type === 'dark' ? COLOR_ACID_GREEN : COLOR_GREY_6,
      background: theme.palette.type === 'dark' ? COLOR_BLACK_2 : COLOR_GREY_3,
      [formatMedia.BREAKPOINT_TABLET]: {
        marginTop: 0,
        marginLeft: theme.spacing(2.5),
      },
    },
    connectButtonWrapper: {
      ...flexHelper('flex-end'),
    },
  });
});
