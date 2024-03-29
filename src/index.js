import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Location } from '@reach/router';
import { PersistGate } from 'redux-persist/integration/react';
import App from './components/App';
import RelayEnvironmentContext from './components/RelayEnvironmentContext';
import MatrixClientContext from './components/MatrixClientContext';
import ModalRenderer from './components/ModalRenderer';
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
import CommunitiesList from './pages/CommunitiesList';
import User from './pages/User';
import Catalog from './pages/Catalog';
import Signup from './pages/Signup';
import GroupSettings from './pages/GroupSettings';
import ChatLayout from './components/ChatLayout';

const { store, persistor } = createStore();
const relayEnvironment = createRelayEnvironment(store);

const tree = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Signup path="/signup" />
        <App
          path="/*"
          render={context => (
            <MatrixClientContext.Provider value={context.matrixClient}>
              <RelayEnvironmentContext.Provider value={relayEnvironment}>
                <Router>
                  <ChatLayout {...context} path="/" relayEnvironment={relayEnvironment}>
                    <Home path="/" {...context} relayEnvironment={relayEnvironment} />
                    <Room path="/room/:id" {...context} relayEnvironment={relayEnvironment} />
                  </ChatLayout>
                  <Community path="/community/:id" {...context} relayEnvironment={relayEnvironment} />
                  <GroupSettings path="group/:id/settings" {...context} relayEnvironment={relayEnvironment} />
                  <CommunitiesList path="communities" {...context} relayEnvironment={relayEnvironment} />
                  <Profile path="profile" {...context} relayEnvironment={relayEnvironment} />
                  <Payments path="payments" {...context} />
                  <Settings path="settings" {...context} />
                  <User path="user/:name" {...context} />
                  <Catalog path="catalog" {...context} />
                </Router>
                <Location>{props => <ModalRenderer modals={modals} {...props} {...context} />}</Location>
              </RelayEnvironmentContext.Provider>
            </MatrixClientContext.Provider>
          )}
        />
      </Router>
    </PersistGate>
  </Provider>
);

const node = document.getElementById('app');

if (node) {
  render(tree, node);
} else {
  console.error('Mount node not found');
}
