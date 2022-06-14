import React, { useMemo, useState, VFC } from 'react';

import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { EditableField } from 'components/EditableField';
import { contractsHelper, validateOnlyNumbers } from 'utils';
import { useShallowSelector } from 'hooks';
import userSelectors from 'store/user/selectors';
import { useStyles } from './ChangePriceCard.styles';

export interface ChangePriceCardProps {
  title: string;
  price: string;
  onClick?: (fieldValue: string | number, isDisabled: boolean) => void;
  className?: string;
}

export const ChangePriceCard: VFC<ChangePriceCardProps> = ({
  title, className, price, onClick,
}) => {
  const classes = useStyles();
  const [fieldValue, setFieldValue] = useState(price);
  const [isChangeMode, setIsChangeMode] = useState(false);
  const handleClick = (newFieldValue: string | number, isDisabled: boolean) => {
    setIsChangeMode(isDisabled);
    if (onClick) {
      onClick(newFieldValue, isDisabled);
    }
  };

  // TODO: refactor this
  const { isMainnet } = useShallowSelector(
    userSelectors.getUser,
  );
  const celoDecimals = useMemo(
    () => contractsHelper.getChainNativeCurrency(isMainnet).decimals,
    [isMainnet],
  );
  const handleChange = (fieldValue: string | number) => {
    if (validateOnlyNumbers(fieldValue.toString(), celoDecimals)) {
      setFieldValue(fieldValue.toString());
    }
  };

  return (
    <Box className={clsx(classes.root, className)}>
      <Typography className={classes.header} variant="body1">{title}</Typography>
      <Typography variant="body2" className={classes.fieldLabel}>Current price</Typography>
      <EditableField
        className={classes.field}
        value={fieldValue}
        icon={<Typography className={classes.currency}>Celo</Typography>}
        disabled={!isChangeMode}
        onClick={handleClick}
        onChange={handleChange}
      />
    </Box>

  );
};
