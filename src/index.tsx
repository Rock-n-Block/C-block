import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Connector from 'services/walletConnect';
import { App } from './containers';
import * as serviceWorker from './serviceWorker';
import store from './store/configureStore';

import '@celo-tools/use-contractkit/lib/styles.css';
import './index.scss';

const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <Connector>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Connector>
    </PersistGate>
  </Provider>,
  root,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
