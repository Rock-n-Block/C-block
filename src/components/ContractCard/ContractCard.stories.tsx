import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';

import { createContractHelpers } from 'pages/CreateContract/CreateContract.helpers';
import { ContractCard } from './ContractCard';

export default {
  title: 'components/ContractCard',
  component: ContractCard,
};

export const Default: React.FC = () => (
  <Container>
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
