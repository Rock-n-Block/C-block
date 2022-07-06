import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  COLOR_ACID_GREEN, COLOR_BLACK_1, COLOR_BLACK_3, COLOR_GREY_1, COLOR_GREY_2, COLOR_GREY_4,
} from 'theme/colors';
import { FontWeights } from 'theme/Typography';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    padding: theme.spacing(3),
    background: theme.palette.primary.main,
    borderRadius: theme.spacing(2),
    border: `1px solid ${theme.palette.secondary.light}`,
    minHeight: 260,
    '&:hover': {
      border: `1px solid ${COLOR_ACID_GREEN}`,
    },
    transition: theme.transitions.create(['border'], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeOut,
    }),
  },
  cardHead: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(3),
  },
  text: {
    maxHeight: 100,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      background: theme.palette.secondary.main,
      width: 2,
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(0, 0, 0, 0.5)',
    },
    '&::-webkit-scrollbar-thumb': {
      background: COLOR_ACID_GREEN,
    },
  },

  chip: {
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    padding: theme.spacing(0.75, 1.5),
    marginTop: 'auto',

    border: `1px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2}`,
    background: theme.palette.type === 'dark' ? '#1F2023' : COLOR_GREY_4,
    borderRadius: theme.spacing(4.25),
  },
  celoIcon: {
    marginRight: theme.spacing(0.625),
  },
  chipHelperText: {
    marginRight: theme.spacing(0.625),
    color: '#6F6E6E',
    fontSize: '12px',
    fontWeight: FontWeights.fontWeightRegular,
    lineHeight: '20px',
    letterSpacing: '-0.5px',
  },
  chipAmount: {
    color: theme.palette.type === 'dark' ? COLOR_GREY_1 : COLOR_BLACK_1,
    fontSize: '14px',
    fontWeight: FontWeights.fontWeightRegular,
    lineHeight: '20px',
    letterSpacing: '-0.5px',
    '&:not(:last-child)': {
      marginRight: theme.spacing(0.625),
    },
  },
}));
