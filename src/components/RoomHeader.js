import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './RoomHeader.css';

const RoomHeader = ({ community, room, leave }) => (
  <div styleName="root">
    <div styleName="title">
      {community.name}: {room.name}
    </div>
    <div styleName="count">
      25 875 753
      <Button size="small" onClick={leave}>
        Выйти
      </Button>
    </div>
  </div>
);

RoomHeader.propTypes = {
  community: PropTypes.object.isRequired,
  leave: PropTypes.func.isRequired,
  room: PropTypes.object.isRequired,
};

export default RoomHeader;
