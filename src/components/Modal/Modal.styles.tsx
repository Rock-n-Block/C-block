import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';

import { getFormatMedia } from 'theme/utils';

export const useStyles = makeStyles<Theme, { hasTitle: boolean }>((theme: Theme) => {
  const formatMedia = getFormatMedia(theme);

  return createStyles({
    root: {
      [formatMedia.BREAKPOINT_TABLET]: {},
    },
    modalTitle: ({ hasTitle }) => {
      const baseStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: 300,
      };
      return hasTitle ? { ...baseStyles, marginBottom: theme.spacing(4) } : baseStyles;
    },
  });
});
