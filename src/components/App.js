import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from 'store/actions';
import Login from './Login';
import MainMenu from './MainMenu';
import { useMatrix } from './hooks';
import './App.css';

const App = ({ matrix, updateMatrix, render }) => {
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
      <div styleName="content">{render({ matrixClient, matrixRooms })}</div>
    </div>
  );
};

App.propTypes = {
  matrix: PropTypes.object,
  updateMatrix: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
};

App.defaultProps = {
  matrix: null,
};

const selector = state => ({ matrix: state.matrix });
const enhance = connect(
  selector,
  actions
);

export default enhance(App);
