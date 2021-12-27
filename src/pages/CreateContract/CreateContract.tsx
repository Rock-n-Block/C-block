import React, { useCallback } from 'react';
import {
  Box,
  Container, Grid, Switch, Typography,
} from '@material-ui/core';
import { ContractCard } from 'components/ContractCard';
import { useDispatch } from 'react-redux';
import { toggleTestnet } from 'store/user/reducer';
import { useShallowSelector } from 'hooks';
import { State, UserState } from 'types';
import userSelector from 'store/user/selectors';
import { setNotification } from 'utils';
import { NavLink } from 'react-router-dom';
import { createContractHelpers } from './CreateContract.helpers';
import { useStyles } from './CreateContract.styles';

export const CreateContract = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { isMainnet } = useShallowSelector<State, UserState>(userSelector.getUser);

  const handleTestnetChange = useCallback(() => {
    dispatch(toggleTestnet());
    setNotification({
      type: 'info',
      message: `Please change network to ${!isMainnet ? 'Celo Mainnet' : 'Alfahores Testnet'} in your wallet`,
    });
  }, [isMainnet]);

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
        {createContractHelpers.map((contractType) => (
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={contractType.title}>
            <NavLink style={{ width: '100%' }} to={contractType.link}>
              <ContractCard
                {...contractType}
              />
            </NavLink>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
