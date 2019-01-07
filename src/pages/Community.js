import React from 'react';
import PropTypes from 'prop-types';
import Chat from 'components/templates/Chat';

const Community = ({ matrixRooms }) => (
  <Chat matrixRooms={matrixRooms}>
    <h2>Community</h2>
  </Chat>
);

Community.propTypes = {
  matrixRooms: PropTypes.object.isRequired,
};

export default Community;
