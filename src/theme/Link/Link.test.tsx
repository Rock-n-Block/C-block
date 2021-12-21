/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { Link } from '@material-ui/core';
import { render } from '@testing-library/react';

import { ThemeProvider } from 'theme/testUtils';

describe('Button', () => {
  it('should render', () => {
    const { container } = render(
      <ThemeProvider>
        <Link href="#">Text</Link>
      </ThemeProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
