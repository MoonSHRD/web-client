import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SendMessage from 'components/SendMessage';
import RoomTimeline from 'components/organisms/RoomTimeline';
import RoomHeader from 'components/molecules/RoomHeader';
import './Room.css';

const Room = ({ id, matrixClient }) => {
  const [room, setRoom] = useState(matrixClient.getRoom(id));

  useEffect(
    () => {
      const handler = (e, r) => setRoom(r);

      matrixClient.on('Room.timeline', handler);
      return () => matrixClient.removeListener('event', handler);
    },
    [matrixClient]
  );

  if (!room) {
    return null;
  }

  return (
    <div styleName="root">
      <RoomHeader />
      <RoomTimeline data={room.timeline} />
      <SendMessage styleName="send" matrixClient={matrixClient} roomId={id} />
    </div>
  );
};

Room.propTypes = {
  matrixClient: PropTypes.object.isRequired,
  id: PropTypes.string,
};

Room.defaultProps = {
  id: null,
};

export default Room;
