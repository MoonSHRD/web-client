import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './components/App';
import createStore from './store/createStore';

const { store, persistor } = createStore();

const tree = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

const node = document.getElementById('app');

if (node) {
  render(tree, node);
} else {
  console.error('Mount node not found');
}
