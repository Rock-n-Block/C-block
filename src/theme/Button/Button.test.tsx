import React from 'react';

import { Button } from '@material-ui/core';
import { render } from '@testing-library/react';

import { ThemeProvider } from 'theme/testUtils';

describe('Button', () => {
  it('should render', () => {
    const { container } = render(
      <ThemeProvider>
        <Button>Text</Button>
      </ThemeProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
