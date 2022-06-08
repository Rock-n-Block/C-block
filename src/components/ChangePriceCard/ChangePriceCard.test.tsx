import React from 'react';

import { render } from '@testing-library/react';

import { ChangePriceCard } from './ChangePriceCard';
import { changePriceCardPropsMocked } from './ChangePriceCard.mock';

describe('ChangePriceCard', () => {
  it('should render', () => {
    const { container } = render(
      <ChangePriceCard
        {...changePriceCardPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
