import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';

import { getFormatMedia } from 'theme/utils';
import { flexHelper, separator } from 'utils';

export const useStyles = makeStyles((theme: Theme) => {
  const formatMedia = getFormatMedia(theme);

  return createStyles({
    root: {
      [formatMedia.BREAKPOINT_TABLET]: {},
    },
    inputContainer: {
      ...flexHelper('space-between'),
      width: '100%',
      '&:not(:last-child)': {
        paddingBottom: theme.spacing(2),
      },
    },
    desc: {
      maxWidth: '70%',
      marginBottom: theme.spacing(2),
    },
    modalTitle: {
      ...flexHelper('flex-start', 'flex-start'),
      flexDirection: 'column',
    },
    modalControls: {
      ...flexHelper('flex-start', 'center'),
      marginTop: theme.spacing(2.5),
      paddingTop: theme.spacing(3),
      ...separator(theme, 'top'),
    },
    saveButton: {},
    cancelButton: {},
    approveButton: {
      marginLeft: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
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
