import React from 'react';

import { render } from '@testing-library/react';

import { ConnectDropdown } from './ConnectDropdown';
import { connectDropdownPropsMocked } from './ConnectDropdown.mock';

describe('ConnectDropdown', () => {
  it('should render', () => {
    const { container } = render(
      <ConnectDropdown
        {...connectDropdownPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
