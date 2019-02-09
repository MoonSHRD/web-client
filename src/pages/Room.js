import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { Button } from 'antd';
import SendMessage from 'components/SendMessage';
import RoomTimeline from 'components/RoomTimeline';
import RoomHeader from 'components/RoomHeader';
import withQueryRenderer from 'hocs/withQueryRenderer';
import './Room.css';

const Room = ({ id, community, matrixClient }) => {
  const [joinedRooms, setJoinedRooms] = useState(null);
  const [room, setRoom] = useState(matrixClient.getRoom(id));

  useEffect(
    () => {
      matrixClient.roomInitialSync(id).then(() => setRoom(matrixClient.getRoom(id)));

      matrixClient.getJoinedRooms().then(res => setJoinedRooms(res.joined_rooms));

      const handler = (e, r) => setRoom(r);

      matrixClient.on('Room', handler);
      return () => matrixClient.removeListener('event', handler);
    },
    [matrixClient]
  );

  if (!joinedRooms) {
    return null;
  }

  const joined = joinedRooms.includes(id);

  if (!joined) {
    const join = async () => {
      await matrixClient.joinRoom(id);
      await matrixClient.roomInitialSync(id);
      setRoom(matrixClient.getRoom(id));
    };

    return <Button onClick={join}>Присоединиться</Button>;
  }

  if (!community || !room) {
    return <div>Room not found</div>;
  }

  const leave = async () => {
    await matrixClient.leave(id);
    setRoom(null);
  };

  return (
    <div styleName="root">
      <RoomHeader community={community} room={room} leave={leave} />
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
