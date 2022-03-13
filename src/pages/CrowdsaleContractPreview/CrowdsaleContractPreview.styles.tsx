import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_ACID_GREEN,
  COLOR_BLACK_2,
  COLOR_GREEN,
  COLOR_GREY_4,
} from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { baseFieldWidthRestriction, getBorderStyle, separator } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  mixedSection: {
    border: getBorderStyle(theme),
    background: theme.palette.type === 'dark' ? COLOR_BLACK_2 : COLOR_GREY_4,
  },
  tokenContractInfoBlock: {
    padding: theme.spacing(1.5, 1.25),
  },
  previewValueBlock: {
    padding: 0,
  },
  previewLabel: {
    marginBottom: theme.spacing(1),
  },
  copyableContainer: {
    ...baseFieldWidthRestriction(theme),
  },
  borderedSection: {
    ...separator(theme),
  },
  sectionTitle: {
    paddingBottom: theme.spacing(2),
  },
  tokenAddressLink: {
    color: theme.palette.type === 'dark' ? COLOR_ACID_GREEN : COLOR_GREEN,
    fontWeight: FontWeights.fontWeightSemiBold,
  },
  disabledInput: {
    ...baseFieldWidthRestriction(theme),
  },
}));
