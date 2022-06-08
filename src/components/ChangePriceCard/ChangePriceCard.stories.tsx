import React from 'react';

import { Box } from '@material-ui/core';

import { ChangePriceCard } from './ChangePriceCard';
import { changePriceCardPropsMocked } from './ChangePriceCard.mock';

export default {
  title: 'components/ChangePriceCard',
  component: ChangePriceCard,
};

export const Default: React.FC = () => (
  <>
    <Box>
      <ChangePriceCard
        {...changePriceCardPropsMocked}
      />
    </Box>
  </>
);
