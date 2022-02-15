import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_BLACK_1, COLOR_GREY_1,
} from 'theme/colors';
import { baseFieldWidthRestriction, separator } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  tokenContractInfoBlock: {
    padding: theme.spacing(4, 0),
    ...separator(theme),
  },
  previewLabel: {
    marginBottom: theme.spacing(2),
  },
  previewLabelWithIcon: {
    display: 'flex',
    '& > *': {
      '&:first-child': {
        marginRight: theme.spacing(1),
      },
    },
  },
  copyableContainer: {
    ...baseFieldWidthRestriction(theme),
  },
  dynamicDataHeader: {
    padding: theme.spacing(4, 0, 3, 0),
  },
  tokenOwnerTitle: {
    paddingBottom: theme.spacing(2),
  },
  nameAmountData: {
    margin: theme.spacing(2, 0),
  },
  helperText: {
    marginTop: theme.spacing(4),
  },
  newCount: {
    color: theme.palette.type === 'dark' ? COLOR_GREY_1 : COLOR_BLACK_1,
  },
}));
