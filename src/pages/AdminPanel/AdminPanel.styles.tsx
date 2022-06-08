import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_BLACK_3, COLOR_BLACK_5, COLOR_GREY, COLOR_GREY_2,
} from 'theme/colors';
import { FontWeights } from 'theme/Typography';

export const useStyle = makeStyles((theme: Theme) => createStyles({
  addressLabel: {
    marginBottom: theme.spacing(4),
  },
  checkBox: {
    marginBottom: theme.spacing(6.25),
    marginRight: theme.spacing(9),
  },
  contractsLabel: {
    marginBottom: theme.spacing(3),
  },
  fieldContainer: {
    marginBottom: theme.spacing(6.25),
  },
  icon: {
    marginLeft: theme.spacing(3),
  },
  tabsContainer: {
    display: 'inline-block',
    padding: theme.spacing(1.25),
  },
  tabButton: {
    height: 44,
    width: 158,
    fontSize: '20px !important',
    lineHeight: '32px !important',
    fontWeight: FontWeights.fontWeightMedium,
    marginBottom: theme.spacing(3.125),
    '&:not(:last-child)': {
      marginRight: theme.spacing(3),
    },
  },
  tabButtonNotActive: {
    backgroundColor: theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2,
    color: theme.palette.type === 'dark' ? COLOR_GREY : COLOR_BLACK_5,
  },
}));
