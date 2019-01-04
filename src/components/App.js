import React from 'react';
import sdk from 'matrix-js-sdk';
import { connect } from 'react-redux';
import { Router } from '@reach/router';
import { updateMatrix } from '../store/actions';
import Login from './Login';
import Sidebar from './Sidebar';
import Room from './Room';

const baseMatrixOptions = {
  baseUrl: 'http://13.59.234.201.xip.io',
};

const App = ({ matrix, updateMatrix }) => {
  const matrixClient = sdk.createClient({
    ...baseMatrixOptions,
    ...matrix,
  });

  if (!matrix) {
    return <Login matrixClient={matrixClient} setMatrix={updateMatrix} />;
  }

  return (
    <div>
      <Sidebar matrixClient={matrixClient} />
      <Router>
        <Room path="room/:id" />
      </Router>
    </div>
  );
};

const selector = state => ({ matrix: state.matrix });
const actions = { updateMatrix };
const enhance = connect(
  selector,
  actions
);

export default enhance(App);
