import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';

import { getFormatMedia } from 'theme/utils';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => {
  const formatMedia = getFormatMedia(theme);

  return createStyles({
    root: {
      [formatMedia.BREAKPOINT_TABLET]: {
      },
    },
    icon: {
      ...flexHelper(),
      flexDirection: 'column',
    },
    desc: {
      maxWidth: '80%',
      textAlign: 'center',
      whiteSpace: 'break-spaces',
    },
  });
});
