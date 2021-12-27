import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_BLACK_1, COLOR_BLACK_3, COLOR_GREY_1, COLOR_GREY_2,
} from 'theme/colors';
import { baseFieldWidthRestriction, flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  tokenContractInfoBlock: {
    padding: `${theme.spacing(4)}px 0`,
    borderBottom: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2}`,
  },
  previewLabel: {
    marginBottom: theme.spacing(2),
  },
  copyableContainer: {
    ...baseFieldWidthRestriction(theme),
  },
  dynamicDataHeader: {
    padding: `${theme.spacing(4)}px 0px ${theme.spacing(3)}px 0px`,
  },
  tokenOwnerTitle: {
    paddingBottom: theme.spacing(2),
  },
  nameAmountData: {
    margin: `${theme.spacing(2)}px 0px`,
  },
  frozenUntil: {
    ...flexHelper(),
    '& > *': {
      '&:first-child': {
        marginRight: theme.spacing(1),
      },
    },
  },
  helperText: {
    marginTop: theme.spacing(4),
  },
  newCount: {
    color: theme.palette.type === 'dark' ? COLOR_GREY_1 : COLOR_BLACK_1,
  },
}));
