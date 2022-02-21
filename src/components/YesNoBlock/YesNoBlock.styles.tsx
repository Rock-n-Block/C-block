import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { COLOR_ACID_GREEN, COLOR_ERROR } from 'theme/colors';

import { flexHelper } from 'utils';
import { AlignHorizontally } from './YesNoBlock.types';

export const useStyles = makeStyles<
Theme,
{ yes: boolean; justify: AlignHorizontally }
>((theme: Theme) => createStyles({
  root: ({ justify }) => {
    switch (justify) {
      case 'center':
        return flexHelper();
      default:
        return flexHelper('normal', 'center');
    }
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    marginRight: theme.spacing(1.5),
    background: ({ yes }) => (yes ? COLOR_ACID_GREEN : COLOR_ERROR),
  },
}));
