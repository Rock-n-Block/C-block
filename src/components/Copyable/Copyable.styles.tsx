/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_ACID_GREEN, COLOR_BLACK_2, COLOR_BLACK_3, COLOR_GREY_3, COLOR_GREY_4,
} from 'theme/colors';

import { getFormatMedia } from 'theme/utils';

export const useStyles = makeStyles<Theme, { withBorder: boolean }>((theme: Theme) => {
  const formatMedia = getFormatMedia(theme);

  return createStyles({
    root: {
      [formatMedia.BREAKPOINT_TABLET]: {},
    },
    copy: {
    },
    withIcon: {},
    icon: {
      position: 'absolute',
      right: theme.spacing(2),
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      lineHeight: 0, // reset default div's height
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
      padding: theme.spacing(2, 6.5, 2, 2.5),
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      background: theme.palette.type === 'dark' ? COLOR_BLACK_2 : COLOR_GREY_4,
      border: ({ withBorder }) => (withBorder
        ? `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_3}`
        : 'unset'),
      borderRadius: theme.spacing(1),
    },
  });
});
