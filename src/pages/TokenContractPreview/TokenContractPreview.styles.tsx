import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { COLOR_BLACK_3, COLOR_GREY_2 } from 'theme/colors';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  tokenContractInfoBlock: {
    padding: `${theme.spacing(4)}px 0`,
    borderBottom: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2}`,
  },
  previewValueBlock: {
    ...flexHelper('flex-start', 'flex-start'),
    flexDirection: 'column',
  },
  previewLabel: {
    marginBottom: theme.spacing(2),
  },
  copyableContainer: {
    minWidth: 240,
    maxWidth: '70%',
  },
  copyableText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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
}));
