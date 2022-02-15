import React from 'react';

import { Box } from '@material-ui/core';

import { toastifyPropsMocked } from './Toastify.mock';
import { Toastify } from './Toastify';

export default {
  title: 'components/Toastify',
  component: Toastify,
};

export const Default: React.FC = () => (
  <>
    <Box>
      {toastifyPropsMocked.map((toastify, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Toastify key={index} {...toastify} />
      ))}
    </Box>
  </>
);
