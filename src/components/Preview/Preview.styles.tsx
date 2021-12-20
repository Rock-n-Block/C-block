import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_BLACK_1, COLOR_BLACK_2, COLOR_BLACK_3, COLOR_GREY_1, COLOR_GREY_2,
} from 'theme/colors';

import { getFormatMedia } from 'theme/utils';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => {
  const formatMedia = getFormatMedia(theme);

  return createStyles({
    root: {
      maxWidth: 1120,
      margin: 0,
      [formatMedia.BREAKPOINT_TABLET]: {
      },
    },
    content: {
      padding: theme.spacing(3),
      background: theme.palette.type === 'dark' ? COLOR_BLACK_1 : COLOR_GREY_1,
      borderRadius: theme.spacing(2.5),
      border: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2}`,
    },
    title: {
      ...flexHelper('flex-start'),
      paddingBottom: theme.spacing(4),
      borderBottom: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2}`,
    },
    titleText: {
      marginLeft: theme.spacing(2.5),
    },
    stamp: {},
    controls: {
      ...flexHelper('space-between'),
      marginTop: theme.spacing(3),
      [theme.breakpoints.down('md')]: {
        width: '100%',
        ...flexHelper(),
        flexDirection: 'column-reverse',
      },
    },
    editDeleteBtns: {
      ...flexHelper(),
      [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(4),
        width: '100%',
      },
    },

    button: {
      width: '150px',
      marginRight: theme.spacing(2.5),
      [theme.breakpoints.down('md')]: {
        marginRight: 0,
        width: '100%',
        ...flexHelper(),
      },
    },
    editDelete: {
      background: COLOR_BLACK_2,
      borderColor: COLOR_BLACK_3,
      '&:first-of-type': {
        marginRight: theme.spacing(2),
      },
    },
  });
});
