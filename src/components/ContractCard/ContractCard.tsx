import React, { ReactElement, VFC } from 'react';

import { Box, IconButton, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { celoIcon } from 'assets/img';
import {
  UsdIcon,
} from 'theme/icons';
import { useStyles } from './ContractCard.styles';

export interface ContractCardProps {
  icon?: ReactElement;
  title?: string;
  text?: string;
  minCreationPrice?: {
    celo: string;
    usd: string;
    isFixPrice: boolean;
  };
  className?: string;
}

export const ContractCard: VFC<ContractCardProps> = ({
  icon, title, text, className, minCreationPrice,
}) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.root, className)}>
      <Box className={classes.cardHead}>
        <IconButton className={classes.icon}>{icon}</IconButton>
        <Typography variant="h3">{title}</Typography>
      </Box>
      <Box className={classes.text}>
        {text}
      </Box>
      <Box className={classes.chip}>
        <img className={classes.celoIcon} src={celoIcon} alt="celo token" height="24" width="24" />
        {
          !minCreationPrice.isFixPrice && <Typography className={classes.chipHelperText}>from</Typography>
        }
        <Typography className={classes.chipAmount}>{minCreationPrice.celo} /</Typography>
        <UsdIcon className={classes.usdIcon} />
        <Typography className={classes.chipAmount}>{minCreationPrice.usd}</Typography>
      </Box>
    </Box>
  );
};
