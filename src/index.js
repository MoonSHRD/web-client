import React from 'react';
import { render } from 'react-dom';
import sdk from 'matrix-js-sdk';
import App from './components/App';
import MatrixClientContext from './components/MatrixClientContext';

const client = sdk.createClient({
  baseUrl: 'http://13.59.234.201.xip.io',
});

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
  <MatrixClientContext.Provider value={client}>
    <App />
  </MatrixClientContext.Provider>
);
const node = document.getElementById('app');

if (node) {
  render(tree, node);
} else {
  console.error('Mount node not found');
}
