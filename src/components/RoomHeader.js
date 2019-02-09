import React from 'react';
import PropTypes from 'prop-types';
import './RoomHeader.css';

const RoomHeader = ({ community, room }) => (
  <div styleName="root">
    <div styleName="title">
      {community.name}: {room.name}
    </div>
    <div styleName="count">25 875 753</div>
  </div>
);

RoomHeader.propTypes = {
  community: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
};

export default RoomHeader;
