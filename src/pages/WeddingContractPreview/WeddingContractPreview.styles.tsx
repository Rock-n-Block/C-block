import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_ACID_GREEN, COLOR_BLACK_1, COLOR_BLACK_3, COLOR_GREY_2,
} from 'theme/colors';
import { flexHelper } from 'utils';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  tokenContractInfoBlock: {
    padding: `${theme.spacing(4)}px 0px`,
    '&:nth-child(2)': {
      borderBottom: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2}`,
    },
  },
  previewValueItem: {
    width: '100%',
    padding: 0,
  },
  previewLabel: {
    marginBottom: theme.spacing(2),
  },
  copyableContainer: {
    minWidth: 240,
    width: '100%',
    maxWidth: '70%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  copyableText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  dynamicDataHeader: {
    padding: `${theme.spacing(4)}px 0px ${theme.spacing(3)}px 0px`,
  },
  contractNameTitle: {
    paddingBottom: theme.spacing(2),
  },
  nameAmountData: {
    margin: `${theme.spacing(2)}px 0px`,
  },
  subInfo: {
    ...flexHelper('flex-start'),
    paddingTop: theme.spacing(2),
    '& > *': {
      '&:first-child': {
        marginRight: theme.spacing(2),
        color: theme.palette.type === 'dark' ? COLOR_ACID_GREEN : COLOR_BLACK_1,
      },
    },
  },
  approvalInfo: {
    padding: 0,
    width: '100%',
    paddingTop: theme.spacing(4),
    ...flexHelper('space-between'),
  },
  approvalInfoBlock: {
    marginRight: theme.spacing(2),
    '&:first-child': {
      color: COLOR_GREY_2,
    },
  },
}));
