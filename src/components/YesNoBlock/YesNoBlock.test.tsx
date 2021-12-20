import React from 'react';

import { render } from '@testing-library/react';

import { YesNoBlock } from './YesNoBlock';
import { yesNoBlockPropsMocked } from './YesNoBlock.mock';

describe('YesNoBlock', () => {
  it('should render', () => {
    const { container } = render(
      <YesNoBlock
        {...yesNoBlockPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
