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
    setUpTitle: {
      ...flexHelper('flex-start'),
      flexDirection: 'column',
      borderRadius: theme.spacing(1.5),
      margin: `${theme.spacing(2)}px 0px ${theme.spacing(4)}px 0px`,
      minWidth: 500,
      [theme.breakpoints.down('xs')]: {
        minWidth: 'unset',
      },
    },
    setUpInfoInput: {
      ...flexHelper('space-between'),
      width: '100%',
      '&:not(:last-child)': {
        paddingBottom: theme.spacing(2),
      },
    },
    desc: {
      fontSize: 18,
      letterSpacing: '-0.5px',
      maxWidth: '70%',
      marginBottom: theme.spacing(2),
    },
    setUpInfoHelper: {
      ...flexHelper('space-between'),
      minWidth: 500,
      padding: `0px ${theme.spacing(8)}px 0px ${theme.spacing(3)}px`,
      [theme.breakpoints.down('xs')]: {
        minWidth: 'unset',
      },
    },
    setUpInfoTitle: {
      ...flexHelper('flex-start', 'flex-start'),
      flexDirection: 'column',
    },
    setUpControls: {
      ...flexHelper('flex-start', 'center'),
      marginTop: theme.spacing(3),
    },
    saveButton: {
    },
    cancelButton: {

    },
    approveButton: {
      marginLeft: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
    },
    button: {
      fontSize: 18,
      textTransform: 'none',
      height: 55,
      minWidth: 100,
      maxWidth: 174,
      width: '100%',
    },
  });
});
