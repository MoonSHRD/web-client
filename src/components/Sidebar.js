import React from 'react';
import { Link } from '@reach/router';

const Sidebar = ({ rooms }) => {
  return (
    <div>
      {Object.keys(rooms).map(id => (
        <div key={id}>
          <Link to={`/room/${id}`}>{rooms[id].name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
