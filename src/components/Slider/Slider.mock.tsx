import React from 'react';
import { CloseIcon } from 'theme/icons';
import { CheckBoxProps } from './Slider';

export const checkBoxPropsMocked: CheckBoxProps = {
  icon: <CloseIcon />,
  label: 'Frozen until date',
  name: 'fronzenUntil',
  value: false,
  onClick(): void {
    throw new Error('Function not implemented.');
  },
};
