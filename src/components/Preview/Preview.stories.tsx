import React from 'react';

import { Box } from '@material-ui/core';

import { Preview } from './Preview';
import { previewPropsMocked } from './Preview.mock';

export default {
  title: 'components/Preview',
  component: Preview,
};

export const Default: React.FC = () => (
  <>
    <Box>
      <Preview
        {...previewPropsMocked}
      />
    </Box>
  </>
);
