import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import SendMessage from 'components/SendMessage';
import RoomTimeline from 'components/RoomTimeline';
import RoomHeader from 'components/RoomHeader';
import withQueryRenderer from 'hocs/withQueryRenderer';
import './Room.css';

const Room = ({ id, community, matrixClient }) => {
  const [room, setRoom] = useState(matrixClient.getRoom(id));

  useEffect(
    () => {
      const handler = (e, r) => setRoom(r);

      matrixClient.on('Room.timeline', handler);
      return () => matrixClient.removeListener('event', handler);
    },
    [matrixClient]
  );

  if (!community || !room) {
    return <div>Room not found</div>;
  }

  return (
    <div styleName="root">
      <RoomHeader community={community} room={room} />
      <RoomTimeline room={room} />
      <SendMessage styleName="send" matrixClient={matrixClient} roomId={id} />
    </div>
  );
};

Room.propTypes = {
  matrixClient: PropTypes.object.isRequired,
  community: PropTypes.object,
  id: PropTypes.string,
};

Room.defaultProps = {
  id: undefined,
  community: undefined,
};

const query = graphql`
  query RoomQuery($roomId: String!) {
    community(roomId: $roomId) {
      id
      name
    }
  }
`;

const enhance = withQueryRenderer(query, {
  getVariables: props => ({
    roomId: props.id,
  }),
});

export default enhance(Room);
