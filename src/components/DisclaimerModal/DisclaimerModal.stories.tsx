import React from 'react';

import { Box } from '@material-ui/core';

import { DisclaimerModal } from './DisclaimerModal';
import { disclaimerModalPropsMocked } from './DisclaimerModal.mock';

export default {
  title: 'components/DisclaimerModal',
  component: DisclaimerModal,
};

export const Default: React.FC = () => (
  <>
    <Box>
      <DisclaimerModal
        {...disclaimerModalPropsMocked}
      />
    </Box>
  </>
);
