import React from 'react';

import { Box } from '@material-ui/core';

import { ConnectDropdownModal } from './ConnectDropdownModal';
import { connectDropdownModalPropsMocked } from './ConnectDropdownModal.mock';

export default {
  title: 'components/ConnectDropdownModal',
  component: ConnectDropdownModal,
};

export const Default: React.FC = () => (
  <>
    <Box>
      <ConnectDropdownModal
        {...connectDropdownModalPropsMocked}
      />
    </Box>
  </>
);
