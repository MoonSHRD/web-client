import React from 'react';
import { Icon } from 'antd';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import './Room.css';

const Room = ({ room, communityId, active }) => (
  <Link
    to={`/room/${room.id}?${qs.stringify({ openedCommunity: communityId })}`}
    styleName={`root ${active ? 'active' : ''}`}
  >
    <Icon type="message" styleName="icon" />
    <span>{room.name}</span>
  </Link>
);

Room.propTypes = {
  room: PropTypes.object.isRequired,
  active: PropTypes.bool,
  communityId: PropTypes.string,
};

Room.defaultProps = {
  active: false,
  communityId: undefined,
};

export default Room;
