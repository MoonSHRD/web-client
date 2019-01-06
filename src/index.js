import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from '@reach/router';
import { PersistGate } from 'redux-persist/integration/react';
import App from './components/App';
import ModalRenderer from './components/atoms/ModalRenderer';
import createStore from './store/createStore';
import modals from './modals';

import Room from './pages/Room';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Payments from './pages/Payments';

const { store, persistor } = createStore();

const tree = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App>
        {context => (
          <React.Fragment>
            <Router>
              <Home path="/" {...context} />
              <Room path="room/:id" {...context} />
              <Profile path="profile" {...context} />
              <Payments path="payments" {...context} />
              <Settings path="settings" {...context} />
            </Router>
            <ModalRenderer modals={modals} {...context} />
          </React.Fragment>
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
