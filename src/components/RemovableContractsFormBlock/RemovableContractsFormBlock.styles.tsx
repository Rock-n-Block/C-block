import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';

import { COLOR_BLACK_1, COLOR_GREY_2 } from 'theme/colors';
import { flexHelper } from 'utils';

interface IProps {
  hasTitleSection: boolean;
}

export const useStyles = makeStyles<Theme, IProps>((theme: Theme) => createStyles({
  root: ({ hasTitleSection }) => {
    const baseStyles = {
      padding: theme.spacing(4, 3),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3, 2),
      },
      background: theme.palette.type === 'dark' ? COLOR_BLACK_1 : COLOR_GREY_2,
      borderRadius: theme.spacing(2.5),
      marginBottom: theme.spacing(4),
    };
    return hasTitleSection ? baseStyles : {
      display: 'flex',
      ...baseStyles,
    };
  },
  title: {
    ...flexHelper<IProps>('space-between', 'flex-start'),
    marginBottom: theme.spacing(3),
  },
  deleteIcon: ({ hasTitleSection }) => {
    const withoutTitleStyles = {
      width: '2%',
      marginLeft: theme.spacing(2),
    };
    const baseStyles = {
      cursor: 'pointer',
      '&:hover': {
        filter: 'brightness(50%)',
      },
    };
    return hasTitleSection ? baseStyles : {
      ...withoutTitleStyles,
      ...baseStyles,
    };
  },
  grid: ({ hasTitleSection }) => (hasTitleSection ? {} : { width: '100%' }),
}));
