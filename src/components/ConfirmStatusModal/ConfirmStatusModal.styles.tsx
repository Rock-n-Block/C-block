import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';

import { getFormatMedia } from 'theme/utils';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => {
  const formatMedia = getFormatMedia(theme);

  return createStyles({
    root: {
      [formatMedia.BREAKPOINT_TABLET]: {},
    },
    modalTitle: {
      ...flexHelper('flex-start', 'flex-start'),
      flexDirection: 'column',
    },
    desc: {
      maxWidth: '70%',
      marginBottom: theme.spacing(2),
    },
    modalControls: {
      ...flexHelper('flex-start', 'center'),
      marginTop: theme.spacing(3),
    },
    button: {
      minWidth: 100,
      maxWidth: 174,
      width: '100%',
      height: 55,
      fontSize: 18,
      textTransform: 'none',
    },
  });
});
