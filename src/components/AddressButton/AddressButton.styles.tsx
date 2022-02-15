import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { COLOR_ACID_GREEN } from 'theme/colors';

import { getFormatMedia } from 'theme/utils';
import { flexHelper, getBorderStyle } from 'utils';

export const useStyles = makeStyles((theme: Theme) => {
  const formatMedia = getFormatMedia(theme);

  return createStyles({
    root: {
      position: 'relative',
      boxSizing: 'border-box',
      ...flexHelper('center'),
      padding: theme.spacing(2, 3, 2, 2),
      cursor: 'pointer',
      background: theme.palette.primary.main,
      border: getBorderStyle(theme),
      borderRadius: theme.spacing(4),
      '&:hover': {
        borderColor: COLOR_ACID_GREEN,
      },
      [formatMedia.BREAKPOINT_TABLET]: {
      },
    },
  });
});
