import React from 'react';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';

import { darkTheme } from './theme';

export const ThemeProvider: React.FC = ({ children }) => (
  <MuiThemeProvider theme={darkTheme}>{children}</MuiThemeProvider>
);
