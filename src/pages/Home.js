import React from 'react';
import PropTypes from 'prop-types';
import Chat from 'components/templates/Chat';

const Home = ({ matrixRooms }) => (
  <Chat matrixRooms={matrixRooms}>
    <h2>Home</h2>
  </Chat>
);

Home.propTypes = {
  matrixRooms: PropTypes.object.isRequired,
};

export default Home;
