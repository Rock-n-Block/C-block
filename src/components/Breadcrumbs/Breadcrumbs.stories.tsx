import React from 'react';

import { Box } from '@material-ui/core';

import { Breadcrumbs } from './Breadcrumbs';
import { breadcrumbsListMocked } from './Breadcrumbs.mock';

export default {
  title: 'components/Breadcrumbs',
  component: Breadcrumbs,
};

export const Default: React.FC = () => (
  <>
    {
      breadcrumbsListMocked.map((props, index) => (
        <Box // eslint-disable-next-line react/no-array-index-key
          key={index}
          style={{
            marginBottom: 50,
          }}
        >
          <Breadcrumbs {...props} />
        </Box>
      ))
    }
  </>
);
