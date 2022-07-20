import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';

import { BreakpointsProvider } from 'hooks/useBreakpoints';
import { darkTheme, lightTheme } from 'theme';
import {
  Layout,
  ModalsContainer,
  AuthModalsContainer,
  AppRoutes,
  AdminModalsContainer,
  RoutesGuard,
} from 'containers';
import { useAdminPanel, useShallowSelector } from 'hooks';
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
    // next line is needed to prevent running walletService.connect()
    //    on each render(), probably due to @see https://github.com/discord/eslint-plugin-react-discord/blob/master/docs/rules/jsx-no-constructed-context-values.md
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAdminPanel();

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
          <AuthModalsContainer />
          <AdminModalsContainer />

          <RoutesGuard>
            <Layout>
              <AppRoutes />
            </Layout>
          </RoutesGuard>

        </StylesProvider>
      </BreakpointsProvider>
    </ThemeProvider>
  );
}

export default App;
