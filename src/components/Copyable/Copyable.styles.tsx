/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_ACID_GREEN, COLOR_BLACK_3, COLOR_GREY_3,
} from 'theme/colors';

import { getFormatMedia } from 'theme/utils';

export const useStyles = makeStyles<Theme, { withBorder: boolean }>((theme: Theme) => {
  const formatMedia = getFormatMedia(theme);

  return createStyles({
    root: {
      [formatMedia.BREAKPOINT_TABLET]: {
      },
    },
    copy: {
    },
    withIcon: {},
    icon: {
      position: 'absolute',
      right: theme.spacing(2),
      top: '15%',
      cursor: 'pointer',
      '&:hover': {
        '& > *': {
          '& > *': {
            fill: COLOR_ACID_GREEN,
          },
        },
      },
    },
    copyableContainer: {
      position: 'relative',
      width: '100%',
      minWidth: 0,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      border: ({ withBorder }) => (withBorder
        ? `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_3}`
        : 'unset'),
      borderRadius: theme.spacing(2),
      padding: `${theme.spacing(1.5)}px ${theme.spacing(6.5)}px ${theme.spacing(1.5)}px ${theme.spacing(2.5)}px`,
    },
  });
});
