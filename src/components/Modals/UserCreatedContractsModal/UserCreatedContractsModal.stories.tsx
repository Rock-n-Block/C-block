import React from 'react';

import { Box } from '@material-ui/core';

import { UserCreatedContractsModal } from './UserCreatedContractsModal';
import { userCreatedContractsModalPropsMocked } from './UserCreatedContractsModal.mock';

export default {
  title: 'components/UserCreatedContractsModal',
  component: UserCreatedContractsModal,
};

export const Default: React.FC = () => (
  <>
    <Box>
      <UserCreatedContractsModal
        {...userCreatedContractsModalPropsMocked}
      />
    </Box>
  </>
);
