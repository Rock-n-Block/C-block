import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import { PersistGate } from 'redux-persist/integration/react';
import { addDecorator } from "@storybook/react";
import { CssBaseline, StylesProvider, ThemeProvider } from "@material-ui/core";

import Connector from 'services/walletConnect';

import store from "store/configureStore";
import { darkTheme, lightTheme } from "theme";
import { BreakpointsProvider } from "hooks/useBreakpoints";

import '@celo-tools/use-contractkit/lib/styles.css';
import "../src/index.scss";

const StoreDecorator = (story) => {
  return (
    <Provider store={store.store}>
      {/* <PersistGate loading={null} persistor={store.persistor}> */}
        <Connector>{story()}</Connector>
      {/* </PersistGate> */}
    </Provider>
  );
};
const RouterDecorator = (story) => <BrowserRouter>{story()}</BrowserRouter>;
const MUIDecorator = (story) => {
  const selectedTheme = store.store.getState().user.isLight
    ? lightTheme
    : darkTheme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <BreakpointsProvider>
        <StylesProvider>
          <CssBaseline />
          {story()}
        </StylesProvider>
      </BreakpointsProvider>
    </ThemeProvider>
  );
};

addDecorator(StoreDecorator);
addDecorator(RouterDecorator);
addDecorator(MUIDecorator);

export const parameters = { layout: "fullscreen" };
