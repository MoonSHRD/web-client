import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from '@reach/router';
import { PersistGate } from 'redux-persist/integration/react';
import App from './components/App';
import createStore from './store/createStore';

import Room from './pages/Room';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Payments from './pages/Payments';

const { store, persistor } = createStore();

const tree = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App>
        {context => (
          <Router>
            <Home path="/" {...context} />
            <Room path="room/:id" {...context} />
            <Payments path="payments" {...context} />
            <Settings path="settings" {...context} />
          </Router>
        )}
      </App>
    </PersistGate>
  </Provider>
);

const node = document.getElementById('app');

if (node) {
  render(tree, node);
} else {
  console.error('Mount node not found');
}
