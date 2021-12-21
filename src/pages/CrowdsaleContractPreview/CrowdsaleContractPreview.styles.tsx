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
import { flexHelper } from 'utils';

const baseFieldWidthRestriction = (theme: Theme) => ({
  minWidth: 240,
  maxWidth: '70%',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
});

const getBorderStyle = (theme: Theme) => `1px solid ${
  theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2
}`;
const separator = (theme: Theme) => ({
  borderBottom: getBorderStyle(theme),
});

export const useStyles = makeStyles((theme: Theme) => createStyles({
  tokenAddressSection: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  mixedSection: {
    ...separator(theme),
    border: getBorderStyle(theme),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginLeft: -theme.spacing(3),
    marginRight: -theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    background: theme.palette.type === 'dark' ? COLOR_BLACK_2 : COLOR_GREY_3,
  },
  mixMaxInvestmentsLimitationsSection: {
    ...separator(theme),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  amountBonusSection: {
    ...separator(theme),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  crowdsaleOwnerSection: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  tokenContractInfoBlock: {
    padding: '12px 10px',
  },
  previewValueBlock: {
    ...flexHelper('flex-start', 'flex-start'),
    flexDirection: 'column',
    padding: 0,
  },
  previewLabel: {
    marginBottom: theme.spacing(1),
  },
  copyableContainer: {
    ...baseFieldWidthRestriction(theme),
  },
  copyableText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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
      padding: '16px 20px 16px 20px !important',
      color: `${theme.palette.type === 'dark' ? COLOR_GREY_1 : COLOR_GREY_6} !important`,
      textOverflow: 'ellipsis',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      background: 'none !important',
      borderColor: `${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2} !important`,
    },
  },
}));
