import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_ACID_GREEN,
  COLOR_BLACK_2,
  COLOR_BLACK_3,
  COLOR_GREY_1,
  COLOR_GREY_2,
  COLOR_GREY_3,
  COLOR_GREY_6,
} from 'theme/colors';
import { baseFieldWidthRestriction } from 'utils';

const getBorderStyle = (theme: Theme) => `1px solid ${
  theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2
}`;
const separator = (theme: Theme) => ({
  borderBottom: getBorderStyle(theme),
});

export const useStyles = makeStyles((theme: Theme) => createStyles({
  mixedSection: {
    border: getBorderStyle(theme),
    background: theme.palette.type === 'dark' ? COLOR_BLACK_2 : COLOR_GREY_3,
  },
  tokenContractInfoBlock: {
    padding: `${theme.spacing(1.5)}px ${theme.spacing(1.25)}px`,
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
    color: COLOR_ACID_GREEN,
  },
  disabledInput: {
    ...baseFieldWidthRestriction(theme),
    '& input': {
      padding: `${theme.spacing(2)}px ${theme.spacing(2.5)}px !important`,
      color: `${theme.palette.type === 'dark' ? COLOR_GREY_1 : COLOR_GREY_6} !important`,
      textOverflow: 'ellipsis',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      background: 'none !important',
      borderColor: `${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2} !important`,
    },
  },
}));
