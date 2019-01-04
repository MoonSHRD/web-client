import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router } from '@reach/router';

import * as actions from '../store/actions';
import Login from './Login';
import Sidebar from './Sidebar';
import Room from './Room';
import MainMenu from './MainMenu';
import { useMatrix } from './hooks';
import './App.css';

const App = ({ matrix, updateMatrix }) => {
  const { matrixClient, matrixRooms } = useMatrix(matrix);

  if (!matrixClient) {
    return null;
  }

  if (!matrix) {
    return <Login matrixClient={matrixClient} setMatrix={updateMatrix} />;
  }

  return (
    <div styleName="root">
      <MainMenu styleName="menu" />
      <Sidebar rooms={matrixRooms} styleName="sidebar" />
      <div styleName="content">
        <Router>
          <Room path="room/:id" matrixClient={matrixClient} />
        </Router>
      </div>
    </div>
  );
};

App.propTypes = {
  matrix: PropTypes.object.isRequired,
  updateMatrix: PropTypes.func.isRequired,
};

const selector = state => ({ matrix: state.matrix });
const enhance = connect(
  selector,
  actions
);

export default enhance(App);
