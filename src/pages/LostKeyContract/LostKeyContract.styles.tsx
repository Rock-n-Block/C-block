import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { separator } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  form: {
    ...separator(theme, 'top'),
    width: '90%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  gridContainer: {
    margin: 0,
    height: 'unset',
    width: 'unset',
  },
  gridItem: {
    margin: 0,
    padding: 0,
  },
  item: {
    '&:not(:last-child)': {
      paddingRight: theme.spacing(3),
    },
  },
  contractNameSection: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  managementAddressSection: {
    ...separator(theme),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  managementAddressSectionTitle: {
    marginBottom: theme.spacing(2),
  },
  reservesSection: {
    marginTop: 50,
  },
  confirmLiveStatusSection: {
    ...separator(theme),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  rewardAmountSection: {
    ...separator(theme),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  buttonsGroupSection: {
    ...separator(theme),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
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
  additionalText: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));
