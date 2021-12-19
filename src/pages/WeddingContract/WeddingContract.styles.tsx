import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_BLACK_1, COLOR_BLACK_3, COLOR_GREY_1, COLOR_GREY_5,
} from 'theme/colors';

export const useStyles = makeStyles((theme: Theme) => {
  const unsetOrder = {
    [theme.breakpoints.down('sm')]: {
      order: 'unset',
    },
  };
  return createStyles({
    form: {
      width: '90%',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    tokenContractFormSection: {
      borderTop: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_5}`,
      padding: `${theme.spacing(5)}px 0px`,
    },
    shortInput: {
      minWidth: theme.palette.type === 'dark' ? '190px' : '190px',
      width: `${theme.palette.type === 'dark' ? '40%' : '40%'} !important`,
    },
    submitButton: {
      width: '150px !important',
      marginRight: theme.spacing(2.5),
    },
    resetButton: {
      width: '150px !important',
    },

    helperText: {
      marginTop: theme.spacing(4),
    },

    address: {
      order: 1,
      ...unsetOrder,
    },

    name: {
      order: 3,
      ...unsetOrder,
    },

    amount: {
      order: 5,
      ...unsetOrder,
    },

    isFrozen: {
      order: 2,
      ...unsetOrder,
    },

    frozenUntilDate: {
      order: 4,
      ...unsetOrder,
    },
    newCount: {
      color: theme.palette.type === 'dark' ? COLOR_GREY_1 : COLOR_BLACK_1,
    },
  });
});
