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
import adminSelector from 'store/admin/selectors';
import { getContractsMinCreationPrice } from 'store/contractForms/actions';
import { ContractFormsState } from 'types';
import { createContractHelpers } from './CreateContract.helpers';
import { useStyles } from './CreateContract.styles';

export const CreateContract = () => {
  const { isMainnetDisabled } = useShallowSelector(
    adminSelector.selectState,
  );

  const contractForms: ContractFormsState = useShallowSelector(
    contractFormsSelector.getContractForms,
  );
  const { isMainnet } = useShallowSelector(userSelector.getUser);
  const celoDecimals = useMemo(() => contractsHelper.getTokensDecimals('celo', isMainnet), [isMainnet]);
  const cusdDecimals = useMemo(() => contractsHelper.getTokensDecimals('cusd', isMainnet), [isMainnet]);
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
        getTokenAmountDisplay(unformattedPrice.cusd, cusdDecimals),
      ).toFixed(2);
      return {
        celo: formatNumber(+celo, ['en-US']),
        cusd: formatNumber(+usd, ['en-US']),
        isFixPrice: index > 1,
      };
    }),
    [
      celoDecimals,
      cusdDecimals,
      contractForms.crowdsaleContract.additional.minCreationPrice,
      contractForms.lostKeyContract.additional.minCreationPrice,
      contractForms.tokenContract.additional.minCreationPrice,
      contractForms.weddingContract.additional.minCreationPrice,
      contractForms.willContract.additional.minCreationPrice,
    ],
  );

  const dispatch = useDispatch();
  const handleTestnetChange = useCallback(() => {
    if (isMainnetDisabled) return;
    dispatch(toggleTestnet());
    setNotification({
      type: 'info',
      message: `Please change network to ${
        !isMainnet ? 'Celo Mainnet' : 'Alfahores Testnet'
      } in your wallet`,
    });
  }, [dispatch, isMainnetDisabled, isMainnet]);

  useEffect(() => {
    dispatch(
      getContractsMinCreationPrice({
        provider: getDefaultProvider(),
      }),
    );
  }, [dispatch, getDefaultProvider]);

  const classes = useStyles();

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Box className={classes.testnetSwitcher}>
            <Typography>Test net</Typography>
            <Switch
              checked={!isMainnet}
              disabled={isMainnetDisabled}
              onClick={handleTestnetChange}
            />
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
