import React from 'react';

import { Box } from '@material-ui/core';

import { YesNoBlock } from './YesNoBlock';
import { yesNoBlockPropsMocked } from './YesNoBlock.mock';

export default {
  title: 'components/YesNoBlock',
  component: YesNoBlock,
};

export const Default: React.FC = () => (
  <>
    <Box>
      <YesNoBlock
        {...yesNoBlockPropsMocked}
      />
    </Box>
  </>
);
