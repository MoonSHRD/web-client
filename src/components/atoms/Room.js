import React from 'react';
import { Icon } from 'antd';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import './Room.css';

const Room = ({ room, selectedRoom }) => (
  <Link to={`/room/${room.id}`} styleName={`root ${selectedRoom === room.id ? 'active' : ''}`}>
    <Icon type="message" styleName="icon" />
    <span>{room.name}</span>
  </Link>
);

Room.propTypes = {
  room: PropTypes.object.isRequired,
  selectedRoom: PropTypes.string.isRequired,
};

export default Room;
