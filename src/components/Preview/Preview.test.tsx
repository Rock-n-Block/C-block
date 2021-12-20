import React from 'react';

import { render } from '@testing-library/react';

import { Preview } from './Preview';
import { previewPropsMocked } from './Preview.mock';

describe('Preview', () => {
  it('should render', () => {
    const { container } = render(
      <Preview
        {...previewPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
