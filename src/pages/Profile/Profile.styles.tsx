import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_ACID_GREEN,
  COLOR_BLACK_2,
  COLOR_BLACK_3, COLOR_GREY_2, COLOR_GREY_3, COLOR_GREY_6,
} from 'theme/colors';
import { getFormatMedia } from 'theme/utils';
import { flexHelper } from 'utils';

export const useStyles = makeStyles<Theme, { hasUploadedLogoImage: boolean }>((theme: Theme) => {
  const formatMedia = getFormatMedia(theme);
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
    gridField: {
      padding: theme.spacing(2, 1.25),
    },
    changePasswordBtn: {
      marginTop: 4,
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
      ...flexHelper(),
      transform: 'scale(1) rotate(0deg)',
      width: 160,
      height: 160,
      outlineStyle: ({ hasUploadedLogoImage }) => (hasUploadedLogoImage ? 'solid' : 'dashed'),
      outlineWidth: 2,
      outlineColor: COLOR_ACID_GREEN,
      borderRadius: '50%',
      background: COLOR_BLACK_3,
      transition: theme.transitions.create('transform'),

      '&:active': {
        transform: 'scale(0.95)',
      },

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
      cursor: 'pointer',
    },
    uploadLogoImageBtn: {
      marginTop: 8,
    },
    imageUploaderDescription: {
      maxWidth: 151,
      whiteSpace: 'break-spaces',
    },

    buttonsGroup: {
      padding: theme.spacing(5, 0),
    },
    submitButton: {
      width: '150px !important',
      marginRight: theme.spacing(2.5),
    },
    resetButton: {
      width: '150px !important',
    },

    link: {
      textDecoration: 'underline',
      color: theme.palette.type === 'dark' ? COLOR_ACID_GREEN : COLOR_GREY_6,
    },
    select: {
      position: 'absolute',
      top: '44%',
      left: 26,
      height: 24,
      background: 'transparent',
    },
    selectRoot: {
      padding: 0,
      '&:focus': {
        background: 'transparent',
      },
    },
    selectMenu: {
      maxHeight: 500,
    },
    copyableIcon: {
      paddingLeft: theme.spacing(2),
    },
  });
});
