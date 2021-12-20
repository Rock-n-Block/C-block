import React from 'react';

import { Box } from '@material-ui/core';

import { Slider } from './Slider';
import { checkBoxPropsMocked } from './Slider.mock';

export default {
  title: 'components/Slider',
  component: Slider,
};

export const Default: React.FC = () => (
  <>
    <Box>
      <Slider
        {...checkBoxPropsMocked}
      />
    </Box>
  </>
);
