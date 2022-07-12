import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_ACID_GREEN,
  COLOR_BLACK_2,
  COLOR_BLACK_3, COLOR_GREY_2, COLOR_GREY_3, COLOR_GREY_6,
} from 'theme/colors';
import { getFormatMedia } from 'theme/utils';

export const useStyles = makeStyles((theme: Theme) => {
  const formatMedia = getFormatMedia(theme);
  // const unsetOrder = {
  //   [theme.breakpoints.down('sm')]: {
  //     order: 'unset',
  //   },
  // };
  return createStyles({
    form: {
      width: '90%',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    colsWrapper: {
      display: 'flex',
      flexDirection: 'column-reverse',
      [formatMedia.BREAKPOINT_DESKTOP]: {
        flexDirection: 'row',
      },
    },
    leftCol: {
      marginRight: 0,
      [formatMedia.BREAKPOINT_DESKTOP]: {
        maxWidth: 444,
        marginRight: 94,
      },
    },
    tokenContractFormSection: {
      padding: `${theme.spacing(5)}px 0px`,
    },
    submitButton: {
      width: '150px !important',
      marginRight: theme.spacing(2.5),
    },
    resetButton: {
      width: '150px !important',
    },

    imageUploader: {
      marginBottom: theme.spacing(4),
      background: theme.palette.type === 'dark' ? COLOR_BLACK_2 : COLOR_GREY_3,
      border: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2}`,
      borderRadius: theme.spacing(1.5),
      [formatMedia.BREAKPOINT_DESKTOP]: {
        maxWidth: 344,
        height: 'fit-content',
        marginBottom: 0,
      },
    },
    imageUploaderWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 270,
      padding: theme.spacing(9.75, 3, 3, 3),
      '&:not(:first-child)': {
        paddingTop: theme.spacing(2),
      },
    },
    imageUploaderContainer: {
      position: 'relative',
      width: 160,
      height: 160,
      outline: 'dashed',
      outlineWidth: 2,
      outlineColor: COLOR_ACID_GREEN,
      borderRadius: '50%',

      '& img': {
        width: 160,
        height: 160,
        borderRadius: 'inherit',
      },
    },
    nativeFileInput: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
      borderRadius: 'inherit',
    },
    link: {
      textDecoration: 'underline',
      color: theme.palette.type === 'dark' ? COLOR_ACID_GREEN : COLOR_GREY_6,
    },
    select: {
      position: 'absolute',
      top: '44%',
      left: 26,
      // transform: 'translateY(-50%)',
      // width: 90,
      height: 24,
      background: 'transparent',
    },
    selectRoot: {
      // padding: '0 0 0 16px',
      padding: 0,
      '&:focus': {
        background: 'transparent',
      },
    },

    // helperText: {
    //   marginTop: theme.spacing(4),
    // },

    // address: {
    //   order: 1,
    //   ...unsetOrder,
    // },

    // name: {
    //   order: 3,
    //   ...unsetOrder,
    // },

    // amount: {
    //   order: 5,
    //   ...unsetOrder,
    // },

    // isFrozen: {
    //   order: 2,
    //   ...unsetOrder,
    // },

    // frozenUntilDate: {
    //   order: 4,
    //   ...unsetOrder,
    // },

    // newCount: {
    //   color: theme.palette.type === 'dark' ? COLOR_GREY_1 : COLOR_BLACK_1,
    // },
  });
});
