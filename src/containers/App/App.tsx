import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';

import { BreakpointsProvider } from 'hooks/useBreakpoints';
import { darkTheme, lightTheme } from 'theme';
import { Layout, ModalsContainer, AppRoutes } from 'containers';
import { useShallowSelector } from 'hooks';
import userSelector from 'store/user/selectors';
import { useWalletConnectorContext } from 'services';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { isLight, address, wallet } = useShallowSelector(userSelector.getUser);
  const { connect } = useWalletConnectorContext();

  const selectedTheme = isLight ? lightTheme : darkTheme;

  useEffect(() => {
    if (address?.length) {
      connect(wallet);
    }
  }, [address, connect, wallet]);

  return (
    <ThemeProvider theme={selectedTheme}>
      <BreakpointsProvider>
        <StylesProvider>
          <CssBaseline />
          <ToastContainer
            autoClose={4000}
            hideProgressBar
            position="top-right"
            closeButton={false}
          />
          <ModalsContainer />
          <Layout>
            <AppRoutes />
          </Layout>
        </StylesProvider>
      </BreakpointsProvider>
    </ThemeProvider>
  );
}

export default App;
