import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import '@fortawesome/fontawesome-free/css/all.css';
import { PersistGate } from 'redux-persist/integration/react';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const history = createBrowserHistory({ basename: baseUrl });

const initialState = window.initialReduxState;
const storeSettings = configureStore(history, initialState);
const store = storeSettings.store;
const persistor = storeSettings.persistor;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  rootElement,
);
