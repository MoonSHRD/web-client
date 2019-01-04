import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

const Sidebar = ({ rooms }) => (
  <div>
    {Object.keys(rooms).map(id => (
      <div key={id}>
        <Link to={`/room/${id}`}>{rooms[id].name}</Link>
      </div>
    ))}
  </div>
);

Sidebar.propTypes = {
  rooms: PropTypes.object.isRequired,
};

export default Sidebar;
