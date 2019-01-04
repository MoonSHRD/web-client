import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Router } from '@reach/router';
import { updateMatrix } from '../store/actions';
import Login from './Login';
import Sidebar from './Sidebar';
import Room from './Room';
import { useMatrix } from './hooks';

const App = ({ matrix, updateMatrix }) => {
  const { matrixClient, matrixRooms } = useMatrix(matrix);

  if (!matrixClient) {
    return null;
  }

  if (!matrix) {
    return <Login matrixClient={matrixClient} setMatrix={updateMatrix} />;
  }

  return (
    <div>
      <Sidebar rooms={matrixRooms} />
      <Router>
        <Room path="room/:id" matrixClient={matrixClient} />
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
