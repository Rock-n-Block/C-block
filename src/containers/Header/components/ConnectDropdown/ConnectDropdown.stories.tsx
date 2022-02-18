import React from 'react';

import { Box } from '@material-ui/core';

import { ConnectDropdown } from './ConnectDropdown';
import { connectDropdownPropsMocked } from './ConnectDropdown.mock';

export default {
  title: 'components/ConnectDropdown',
  component: ConnectDropdown,
};

export const Default: React.FC = () => (
  <>
    <Box>
      <ConnectDropdown
        {...connectDropdownPropsMocked}
      />
    </Box>
  </>
);
