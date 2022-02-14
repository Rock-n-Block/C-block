import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Provider } from 'react-redux';
import Connector from 'services/walletConnect';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';
import store from './store/configureStore';
import '@celo-tools/use-contractkit/lib/styles.css';

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
