import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Location } from '@reach/router';
import { PersistGate } from 'redux-persist/integration/react';
import App from './components/App';
import RelayEnvironmentContext from './components/RelayEnvironmentContext';
import MatrixClientContext from './components/MatrixClientContext';
import ModalRenderer from './components/templates/ModalRenderer';
import createStore from './store/createStore';
import createRelayEnvironment from './createRelayEnvironment';
import modals from './modals';

import './antd-theme.less';
import './scrollbar.css';

import Room from './pages/Room';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Payments from './pages/Payments';
import Community from './pages/Community';

const { store, persistor } = createStore();
const relayEnvironment = createRelayEnvironment(store);

const tree = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App>
        {context => (
          <MatrixClientContext.Provider value={context.matrixClient}>
            <RelayEnvironmentContext.Provider value={relayEnvironment}>
              <Router>
                <Home path="/" {...context} />
                <Room path="room/:id" {...context} relayEnvironment={relayEnvironment} />
                <Community path="community/:id" {...context} relayEnvironment={relayEnvironment} />
                <Profile path="profile" {...context} />
                <Payments path="payments" {...context} />
                <Settings path="settings" {...context} />
              </Router>
              <Location>{props => <ModalRenderer modals={modals} {...props} {...context} />}</Location>
            </RelayEnvironmentContext.Provider>
          </MatrixClientContext.Provider>
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
