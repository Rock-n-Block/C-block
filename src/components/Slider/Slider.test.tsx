import React from 'react';

import { render } from '@testing-library/react';

import { Slider } from './Slider';
import { checkBoxPropsMocked } from './Slider.mock';

describe('CheckBox', () => {
  it('should render', () => {
    const { container } = render(
      <Slider
        {...checkBoxPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
