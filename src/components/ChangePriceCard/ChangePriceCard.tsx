import React, { useState, VFC } from 'react';

import { Box, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import BigNumber from 'bignumber.js';

import { EditableField } from 'components';
import { contractsHelper, validateOnlyNumbers } from 'utils';
import { useShallowSelector } from 'hooks';
import userSelectors from 'store/user/selectors';

import { celoIcon, cUsdTokenIcon } from 'assets';
import { Tokens } from 'types/utils/contractsHelper';
import { useStyles } from './ChangePriceCard.styles';

export interface ChangePriceCardProps {
  title: string;
  prices: Record<Tokens, string>;
  celoAsUsdPrice: string;
  onClick?: (fieldValue: string | number, isDisabled: boolean, tokenName: Tokens) => void;
  className?: string;
}

export const ChangePriceCard: VFC<ChangePriceCardProps> = ({
  title, className, prices, celoAsUsdPrice, onClick,
}) => {
  const classes = useStyles();
  const [state, setState] = useState({
    celo: {
      fieldValue: prices.celo,
      isChangeMode: false,
    },
    cusd: {
      fieldValue: prices.cusd,
      isChangeMode: false,
    },
  });
  const handleChangeState = (currency: Tokens, newState: Partial<typeof state['celo']>) => {
    setState((prevState) => ({
      ...prevState,
      [currency]: {
        ...prevState[currency],
        ...newState,
      },
    }));
  };
  const handleClick = (currency: Tokens) => (newFieldValue: string | number, isDisabled: boolean) => {
    handleChangeState(currency, {
      isChangeMode: isDisabled,
    });

    if (new BigNumber(newFieldValue).isEqualTo(currency === 'celo' ? prices.celo : prices.cusd)) return;
    if (!newFieldValue) {
      handleChangeState(currency, {
        fieldValue: currency === 'celo' ? prices.celo : prices.cusd,
      });
      return;
    }

    if (onClick) {
      onClick(newFieldValue, isDisabled, currency);
    }
  };

  const { isMainnet } = useShallowSelector(
    userSelectors.getUser,
  );
  const handleChange = (currency: Tokens) => (fieldValue: string | number) => {
    const decimals = contractsHelper.getTokensDecimals(currency, isMainnet);
    if (validateOnlyNumbers(fieldValue.toString(), decimals)) {
      handleChangeState(currency, {
        fieldValue: fieldValue.toString(),
      });
    }
  };

  return (
    <Box className={clsx(classes.root, className)}>
      <Typography className={classes.header} variant="body1">{title}</Typography>
      <Typography variant="body2" className={classes.fieldLabel}>Current price</Typography>
      <Grid className={classes.fieldsContainer} container>
        <Grid
          item
          xs={8}
          sm={6}
          md={6}
          lg={5}
          xl={4}
        >
          <EditableField
            className={classes.field}
            value={state.celo.fieldValue}
            InputProps={{
              startAdornment: <img
                src={celoIcon}
                alt="celo token"
                height="24"
                width="24"
              />,
            }}
            disabled={!state.celo.isChangeMode}
            onClick={handleClick('celo')}
            onChange={handleChange('celo')}
          />
          <Typography variant="body2" className={classes.fieldLabel}>${celoAsUsdPrice}</Typography>
        </Grid>
        <Grid
          item
          xs={8}
          sm={6}
          md={6}
          lg={5}
          xl={4}
        >
          <EditableField
            className={classes.field}
            value={state.cusd.fieldValue}
            InputProps={{
              startAdornment: <img
                src={cUsdTokenIcon}
                alt="cusd token"
                height="24"
                width="24"
              />,
            }}
            disabled={!state.cusd.isChangeMode}
            onClick={handleClick('cusd')}
            onChange={handleChange('cusd')}
          />
        </Grid>
      </Grid>
    </Box>

  );
};
