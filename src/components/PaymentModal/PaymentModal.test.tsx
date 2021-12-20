import React from 'react';

import { render } from '@testing-library/react';

import { PaymentModal } from './PaymentModal';
import { paymentModalPropsMocked } from './PaymentModal.mock';

describe('PaymentModal', () => {
  it('should render', () => {
    const { container } = render(
      <PaymentModal
        {...paymentModalPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
