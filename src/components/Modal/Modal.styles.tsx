import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';

import { getFormatMedia } from 'theme/utils';

export const useStyles = makeStyles<Theme, { hasTitle: boolean }>((theme: Theme) => {
  const formatMedia = getFormatMedia(theme);

  return createStyles({
    root: {
      [formatMedia.BREAKPOINT_TABLET]: {},
    },
    modalTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      minWidth: 300,
      marginBottom: ({ hasTitle }) => (hasTitle ? theme.spacing(4) : undefined),
    },
  });
});
