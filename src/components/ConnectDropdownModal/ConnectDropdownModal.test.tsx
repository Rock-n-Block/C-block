import React from 'react';

import { render } from '@testing-library/react';

import { ConnectDropdownModal } from './ConnectDropdownModal';
import { connectDropdownModalPropsMocked } from './ConnectDropdownModal.mock';

describe('ConnectDropdownModal', () => {
  it('should render', () => {
    const { container } = render(
      <ConnectDropdownModal
        {...connectDropdownModalPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
