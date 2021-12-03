import React from 'react';

import { render } from '@testing-library/react';

import { Toastify } from './Toastify';
import { toastifyPropsMocked } from './Toastify.mock';

describe('Toastify', () => {
  it('should render', () => {
    const { container } = render(
      <Toastify
        {...toastifyPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
