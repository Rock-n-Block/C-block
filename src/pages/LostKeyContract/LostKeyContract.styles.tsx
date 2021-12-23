import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_GREY_2,
  // COLOR_GREY_5,
  COLOR_BLACK_3,
} from 'theme/colors';
// import { flexHelper } from 'utils';

const getBorderStyle = (theme: Theme) => `1px solid ${
  theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2
}`;
const separator = (theme: Theme) => ({
  borderTop: getBorderStyle(theme),
});

// borderTop: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_5}`,

export const useStyles = makeStyles((theme: Theme) => createStyles({
  form: {
    width: '90%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  gridItem: {
    margin: -10,
  },
  contractNameSection: {
    ...separator(theme),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  managementAddressSection: {
    ...separator(theme),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(5),
  },
  managementAddressSectionTitle: {
    marginBottom: theme.spacing(2),
  },
  crowdsaleContractFormSection: {
    // borderTop: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_5}`,
    padding: `${theme.spacing(5)}px 0px`,
  },

  shortTextField: {
    maxWidth: '50%',
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

  // changingDates: {
  //   padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
  //   background: theme.palette.type === 'dark' ? COLOR_BLACK_1 : COLOR_GREY_2,
  //   borderRadius: theme.spacing(2.5),
  //   marginBottom: theme.spacing(4),
  //   [theme.breakpoints.down('sm')]: {
  //     padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
  //   },
  // },

  // changingDatesHeader: {
  //   ...flexHelper('space-between'),
  //   marginBottom: theme.spacing(3),
  // },

  // changingDatesTitle: {
  //   ...flexHelper('flex-start', 'flex-start'),
  //   color: theme.palette.type === 'dark' ? COLOR_GREY_1 : COLOR_BLACK_1,
  // },
}));
