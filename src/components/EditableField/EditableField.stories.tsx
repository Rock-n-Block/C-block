import React from 'react';

import { Box } from '@material-ui/core';

import { EditableField } from './EditableField';
import { editableFieldPropsMocked } from './EditableField.mock';

export default {
  title: 'components/EditableField',
  component: EditableField,
};

export const Default: React.FC = () => (
  <>
    <Box>
      <EditableField
        {...editableFieldPropsMocked}
      />
    </Box>
  </>
);
