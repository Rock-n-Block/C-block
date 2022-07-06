import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { COLOR_BLACK_2, COLOR_GREY_3, COLOR_ACID_GREEN } from 'theme/colors';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    ...flexHelper('flex-start', 'center'),
  },
  textField: {
    marginRight: theme.spacing(1),
    '& input': {
      textOverflow: 'ellipsis',
    },
  },
  button: {
    background: theme.palette.type === 'dark' ? `${COLOR_BLACK_2} !important` : `${COLOR_GREY_3} !important`,
    '&:hover': {
      background: theme.palette.type === 'dark' ? `${COLOR_BLACK_2} !important` : `${COLOR_GREY_3} !important`,
      border: theme.palette.type === 'dark' ? `1px solid ${COLOR_ACID_GREEN}` : `1px solid ${COLOR_ACID_GREEN}`,
    },
  },
}));
