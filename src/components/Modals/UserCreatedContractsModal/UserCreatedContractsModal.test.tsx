import React from 'react';

import { render } from '@testing-library/react';

import { UserCreatedContractsModal } from './UserCreatedContractsModal';
import { userCreatedContractsModalPropsMocked } from './UserCreatedContractsModal.mock';

describe('ConnectDropdownModal', () => {
  it('should render', () => {
    const { container } = render(
      <UserCreatedContractsModal
        {...userCreatedContractsModalPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
