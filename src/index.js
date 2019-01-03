import React from 'react';
import { render } from 'react-dom';
import sdk from 'matrix-js-sdk';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './components/App';
import createStore from './store/createStore';

const { store, persistor } = createStore();

// client.login('m.login.password', { identifier: { type: "m.id.user", user: "alexes" }, password: 'alexes1alexes' })
//   .then(res => {
//     const c = sdk.createClient({
//       baseUrl: "http://13.59.234.201.xip.io",
//       accessToken: res.access_token,
//       userId: res.user_id,
//     });
//
//     c.sendTextMessage('!ibKkPlmNDASwTpDLRt:13.59.234.201.xip.io', 'hellofrom js auto login');
//   });

// client.publicRooms(function(err, data) {
//   console.log("Public Rooms: %s", JSON.stringify(data));
// });
//
// client.sendTextMessage('!ibKkPlmNDASwTpDLRt:13.59.234.201.xip.io', 'hellofrom js');

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
