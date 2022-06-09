import React, { useState, VFC } from 'react';

import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { EditableField } from 'components/EditableField';
import { useStyles } from './ChangePriceCard.styles';

export interface ChangePriceCardProps {
  title: string;
  price: number;
  className?: string;
}

export const ChangePriceCard: VFC<ChangePriceCardProps> = ({
  title, className, price,
}) => {
  const classes = useStyles();
  const [isChangeMode, setIsChangeMode] = useState(false);
  return (
    <Box className={clsx(classes.root, className)}>
      <Typography className={classes.header} variant="body1">{title}</Typography>
      <Typography variant="body2" className={classes.fieldLabel}>Current price</Typography>
      <EditableField
        className={classes.field}
        value={price}
        icon={<Typography className={classes.currency}>Celo</Typography>}
        disabled={!isChangeMode}
        onClick={() => setIsChangeMode(!isChangeMode)}
      />
    </Box>

  );
};
