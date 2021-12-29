import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';

import { getStylesConstants } from 'components/Sidebar/SideBar.constants';
import { COLOR_ACID_GREEN } from 'theme/colors';
import { flexHelper } from 'utils';
import { FontWeights } from 'theme/Typography';

export const useStyles = makeStyles<Theme, { isSelected: boolean }>((theme: Theme) => {
  const { SIDEBAR_CONTAINER_PADDING } = getStylesConstants(theme);

  return createStyles({
    tab: {
      ...flexHelper('flex-start'),
      height: 48,
      marginLeft: -SIDEBAR_CONTAINER_PADDING,
      marginRight: -SIDEBAR_CONTAINER_PADDING,
      paddingLeft: SIDEBAR_CONTAINER_PADDING,
      cursor: 'pointer',
      background: ({ isSelected }) => (isSelected ? theme.palette.secondary.main : 'unset'),
      boxShadow: ({ isSelected }) => (isSelected ? `2px 0px 0px 0px ${COLOR_ACID_GREEN} inset` : 'unset'),
      '& > *': {
        color: ({ isSelected }) => (isSelected ? COLOR_ACID_GREEN : 'unset'),
        '& > *': {
          fill: ({ isSelected }) => (isSelected ? COLOR_ACID_GREEN : theme.palette.primary.dark),
        },
      },
      '&:hover': {
        boxShadow: `2px 0px 0px 0px ${COLOR_ACID_GREEN} inset`,
        '& > *': {
          color: COLOR_ACID_GREEN,
          '& > *': {
            fill: COLOR_ACID_GREEN,
          },
        },
      },
    },
    iconWrapper: {
      marginRight: theme.spacing(1.5),
      width: 20,
      lineHeight: 0,
    },
    tabLabel: {
      fontSize: '14px',
      fontWeight: FontWeights.fontWeightBold,
    },
  });
});
