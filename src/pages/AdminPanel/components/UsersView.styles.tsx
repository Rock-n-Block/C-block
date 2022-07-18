import { makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import {
  COLOR_BLACK_1, COLOR_BLACK_3, COLOR_GREY_2, COLOR_GREY_3,
} from 'theme/colors';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme) => createStyles({
  searchContainer: {
    ...flexHelper(),
    marginTop: theme.spacing(3),
  },
  searchContainerField: {
    marginRight: theme.spacing(2),
  },
  adminsSwitch: {
    ...flexHelper('flex-start'),
  },

  collapsibleList: {
    marginTop: theme.spacing(1.5),
  },
  pagination: {
    '& li': {
      '& > button': {
        border: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_1 : COLOR_GREY_2}`,
        borderRadius: theme.spacing(1),
        background: `${theme.palette.type === 'dark' ? COLOR_BLACK_1 : COLOR_GREY_3}`,
      },
      '&:first-child > button, &:last-child > button': {
        height: 44,
        width: 44,
        border: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_3}`,
      },
    },
  },
}));
