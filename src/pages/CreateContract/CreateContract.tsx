import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Box, Container, Grid, Switch, Typography,
} from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { ContractCard } from 'components/ContractCard';
import { toggleTestnet } from 'store/user/reducer';
import { useShallowSelector, useWeb3Provider } from 'hooks';
import userSelector from 'store/user/selectors';
import {
  contractsHelper,
  formatNumber,
  getTokenAmountDisplay,
  setNotification,
} from 'utils';
import contractFormsSelector from 'store/contractForms/selectors';
import { getContractsMinCreationPrice } from 'store/contractForms/actions';
import { ContractFormsState } from 'types';
import { createContractHelpers } from './CreateContract.helpers';
import { useStyles } from './CreateContract.styles';

export const CreateContract = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const contractForms: ContractFormsState = useShallowSelector(
    contractFormsSelector.getContractForms,
  );
  const { isMainnet } = useShallowSelector(userSelector.getUser);
  const celoDecimals = useMemo(
    () => contractsHelper.getChainNativeCurrency(isMainnet).decimals,
    [isMainnet],
  );
  const { getDefaultProvider } = useWeb3Provider();

  const minCreationPrices = useMemo(
    () => [
      contractForms.tokenContract.additional.minCreationPrice,
      contractForms.crowdsaleContract.additional.minCreationPrice,
      contractForms.lostKeyContract.additional.minCreationPrice,
      contractForms.willContract.additional.minCreationPrice,
      contractForms.weddingContract.additional.minCreationPrice,
    ].map((unformattedPrice, index) => {
      const celo = new BigNumber(
        getTokenAmountDisplay(unformattedPrice.celo, celoDecimals),
      ).toFixed(3);
      const usd = new BigNumber(
        getTokenAmountDisplay(unformattedPrice.usd, celoDecimals),
      ).toFixed(2);
      return {
        celo: formatNumber(+celo, ['en-US']),
        usd: formatNumber(+usd, ['en-US']),
        isFixPrice: index > 1,
      };
    }),
    [
      celoDecimals,
      contractForms.crowdsaleContract.additional.minCreationPrice,
      contractForms.lostKeyContract.additional.minCreationPrice,
      contractForms.tokenContract.additional.minCreationPrice,
      contractForms.weddingContract.additional.minCreationPrice,
      contractForms.willContract.additional.minCreationPrice,
    ],
  );

  const handleTestnetChange = useCallback(() => {
    dispatch(toggleTestnet());
    setNotification({
      type: 'info',
      message: `Please change network to ${
        !isMainnet ? 'Celo Mainnet' : 'Alfahores Testnet'
      } in your wallet`,
    });
  }, [dispatch, isMainnet]);

  useEffect(() => {
    dispatch(
      getContractsMinCreationPrice({
        provider: getDefaultProvider(),
      }),
    );
  }, [dispatch, getDefaultProvider]);

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box className={classes.testnetSwitcher}>
            <Typography>Test net</Typography>
            <Switch checked={!isMainnet} onClick={handleTestnetChange} />
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        {createContractHelpers.map((contractType, index) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={4}
            key={contractType.title}
          >
            <NavLink style={{ width: '100%' }} to={contractType.link}>
              <ContractCard
                {...contractType}
                minCreationPrice={minCreationPrices[index]}
              />
            </NavLink>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
