import React from 'react';

import { render } from '@testing-library/react';

import { EditableField } from './EditableField';
import { editableFieldPropsMocked } from './EditableField.mock';

describe('EditableField', () => {
  it('should render', () => {
    const { container } = render(
      <EditableField
        {...editableFieldPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
