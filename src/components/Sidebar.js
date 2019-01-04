import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import './Sidebar.css';

const Sidebar = ({ className, rooms, ...props }) => (
  <div styleName="root" className={className} {...props}>
    {Object.keys(rooms).map(id => (
      <div key={id}>
        <Link to={`/room/${id}`}>{rooms[id].name}</Link>
      </div>
    ))}
  </div>
);

Sidebar.propTypes = {
  rooms: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Sidebar.defaultProps = {
  className: undefined,
};

export default Sidebar;
