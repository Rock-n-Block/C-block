import React from 'react';

import { Box } from '@material-ui/core';

import { PaymentModal } from './PaymentModal';
import { paymentModalPropsMocked } from './PaymentModal.mock';

export default {
  title: 'components/PaymentModal',
  component: PaymentModal,
};

export const Default: React.FC = () => (
  <>
    <Box>
      <PaymentModal
        {...paymentModalPropsMocked}
      />
    </Box>
  </>
);
