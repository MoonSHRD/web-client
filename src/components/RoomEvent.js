import React from 'react';
import PropTypes from 'prop-types';
import './RoomEvent.css';

const getText = data => {
  if (data.event.type === 'm.room.member') {
    if (data.event.content.membership === 'leave') {
      return null;
    }

    if (data.event.content.membership === 'join') {
      return `${data.event.content.displayname} присоединился`;
    }
  }

  return data.event.type;
};

const RoomEvent = ({ data }) => {
  const text = getText(data);

  if (!text) {
    return null;
  }

  return (
    <div styleName="root">
      <div styleName="label">{getText(data)}</div>
    </div>
  );
};

RoomEvent.propTypes = {
  data: PropTypes.object.isRequired,
};

export default RoomEvent;
