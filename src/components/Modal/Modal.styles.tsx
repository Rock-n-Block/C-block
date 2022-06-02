import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';

import { getFormatMedia } from 'theme/utils';
import { flexHelper } from 'utils';

export const useStyles = makeStyles<Theme, { hasTitle: boolean }>((theme: Theme) => {
  const formatMedia = getFormatMedia(theme);

  return createStyles({
    root: {
      [formatMedia.BREAKPOINT_TABLET]: {},
    },
    modalTitle: {
      ...flexHelper('space-between', 'flex-start'),
      minWidth: 300,
      marginBottom: ({ hasTitle }) => (hasTitle ? theme.spacing(4) : 'initial'),
    },
    closeBtn: {
      transition: theme.transitions.create('transform'),
      '&:hover': {
        transform: 'rotate(-90deg)',
      },
    },
  });
});
