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
    padding: theme.spacing(5, 0),
  },
  managementAddressSection: {
    ...separator(theme, 'top'),
    padding: theme.spacing(2, 0, 3),
  },
  managementAddressSectionField: {
    paddingLeft: 10,
    paddingRight: 10,
    '&:first-child': {
      paddingLeft: 0,
    },
    '&:nth-child(2)': {
      paddingRight: 0,
    },
    [theme.breakpoints.down('xs')]: {
      padding: 'unset',
    },
  },
  managementAddressSectionTitle: {
    marginBottom: theme.spacing(2),
  },
  reservesSection: {
    marginTop: 50,
  },
  confirmLiveStatusSection: {
    ...separator(theme),
    padding: theme.spacing(5, 0),
  },
  rewardAmountSection: {
    ...separator(theme),
    padding: theme.spacing(5, 0),
  },
  buttonsGroupSection: {
    ...separator(theme),
    padding: theme.spacing(5, 0),
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
    margin: theme.spacing(3, 0, 2),
  },
}));
