import React, { useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';
import { BreakpointsProvider } from 'hooks/useBreakpoints';
import { darkTheme, lightTheme } from 'theme';
import { Layout, Routes } from 'containers';
import { useShallowSelector } from 'hooks';
import userSelector from 'store/user/selectors';
import { State, UserState } from 'types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useWalletConnectorContext } from 'services';

function App() {
  const {
    isLight, address, wallet,
  } = useShallowSelector<State, UserState>(userSelector.getUser);
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
          <Layout>
            <Routes />
          </Layout>
        </StylesProvider>
      </BreakpointsProvider>
    </ThemeProvider>
  );
}

export default App;
