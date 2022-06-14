import React from 'react';
import { SuccessIcon } from 'theme/icons';
import { EditableFieldProps } from './EditableField';

export const editableFieldPropsMocked: EditableFieldProps = {
  icon: <SuccessIcon />,
  defaultValue: 'value',
  disabled: true,
  onClick(): void {
    throw new Error('Function not implemented.');
  },
};
