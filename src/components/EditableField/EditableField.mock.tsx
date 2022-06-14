import React from 'react';
import { SuccessIcon } from 'theme/icons';
import { EditableFieldProps } from './EditableField';

export const editableFieldPropsMocked: EditableFieldProps = {
  icon: <SuccessIcon />,
  value: 'value',
  disabled: true,
  onClick(): void {
    throw new Error('Function not implemented.');
  },
  onChange(): void {
    throw new Error('Function not implemented.');
  },
};
