import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../store/actions';
import Login from './Login';
import MainMenu from './MainMenu';
import { useMatrix } from './hooks';
import './App.css';

const App = ({ matrix, updateMatrix, children, logout }) => {
  const { matrixClient, matrixRooms } = useMatrix(matrix);

  if (!matrixClient) {
    return null;
  }

  if (!matrix) {
    return <Login matrixClient={matrixClient} setMatrix={updateMatrix} />;
  }

  return (
    <div styleName="root">
      <MainMenu styleName="menu" logout={logout} />
      <div styleName="content">{children({ matrixClient, matrixRooms })}</div>
    </div>
  );
};

App.propTypes = {
  matrix: PropTypes.object.isRequired,
  updateMatrix: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const selector = state => ({ matrix: state.matrix });
const enhance = connect(
  selector,
  actions
);

export default enhance(App);
