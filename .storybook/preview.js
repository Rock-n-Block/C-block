import React, { useEffect } from "react";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { addDecorator } from "@storybook/react";
import { CssBaseline, StylesProvider, ThemeProvider } from "@material-ui/core";

import store from 'store/configureStore';
import { theme, lightTheme } from "theme";
import { BreakpointsProvider } from "hooks/useBreakpoints";

import '../src/index.scss';

const StoreDecorator = (story) => {
  return (
    <Provider store={store.store}>{story()}</Provider>
  );
}
const RouterDecorator = (story) => (
  <BrowserRouter>{story()}</BrowserRouter>
);
const MUIDecorator = (story) => {
  const selectedTheme = store.store.getState().user.isLight ? lightTheme : theme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <BreakpointsProvider>
        <StylesProvider>
          <CssBaseline />
          {story()}
        </StylesProvider>
      </BreakpointsProvider>
    </ThemeProvider>
  )
};

addDecorator(StoreDecorator);
addDecorator(RouterDecorator);
addDecorator(MUIDecorator);

export const parameters = { layout: "fullscreen" };
