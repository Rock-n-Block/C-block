import React from 'react';

import { render } from '@testing-library/react';

import { ThemeProvider } from '../testUtils';

import { ErrorIcon } from './components/ErrorIcon';

describe('Icons', () => {
  it('should render', () => {
    const { container } = render(
      <ThemeProvider>
        <ErrorIcon />
      </ThemeProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
