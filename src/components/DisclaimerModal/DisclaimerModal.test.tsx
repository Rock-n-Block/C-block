import React from 'react';

import { render } from '@testing-library/react';

import { DisclaimerModal } from './DisclaimerModal';
import { disclaimerModalPropsMocked } from './DisclaimerModal.mock';

describe('DisclaimerModal', () => {
  it('should render', () => {
    const { container } = render(
      <DisclaimerModal
        {...disclaimerModalPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
