import React from 'react';
import PropTypes from 'prop-types';
import SendMessage from 'components/SendMessage';
import Chat from 'components/templates/Chat';
import './Room.css';

const Message = ({ event }) => <div>{event.content.body}</div>;

Message.propTypes = {
  event: PropTypes.object.isRequired,
};

const Member = ({ event }) => {
  if (event.membership === 'join') {
    return <div>{event.content.displayname} joined!</div>;
  }

  if (event.membership === 'leave') {
    return <div style={{ color: 'red' }}>{event.content.displayname} leave!</div>;
  }

  return <div>Unk member event: {event.membership}</div>;
};

Member.propTypes = {
  event: PropTypes.object.isRequired,
};

const eventViews = {
  'm.room.message': Message,
  'm.room.member': Member,
};

const Room = ({ matrixClient, matrixRooms, id }) => {
  const room = matrixClient.getRoom(id);

  if (!room) {
    return null;
  }

  return (
    <Chat matrixRooms={matrixRooms}>
      <div styleName="root">
        <div styleName="timeline">
          {room.timeline.map(t => {
            const View = eventViews[t.event.type];

            if (!View) {
              console.log(t.event);
              return <div key={t.event.event_id}>Unk event: {t.event.type}</div>;
            }

            return <View event={t.event} key={t.event.event_id} />;
          })}
        </div>
        <SendMessage styleName="send" matrixClient={matrixClient} roomId={id} />
      </div>
    </Chat>
  );
};

Room.propTypes = {
  matrixClient: PropTypes.object.isRequired,
  matrixRooms: PropTypes.object.isRequired,
  id: PropTypes.string,
};

Room.defaultProps = {
  id: null,
};

export default Room;
