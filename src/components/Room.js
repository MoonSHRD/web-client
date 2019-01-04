import React from 'react';

const Message = ({ event }) => <div>{event.content.body}</div>;

const Member = ({ event }) => {
  if (event.membership === 'join') {
    return <div>{event.content.displayname} joined!</div>;
  }

  if (event.membership === 'leave') {
    return <div style={{ color: 'red' }}>{event.content.displayname} leave!</div>;
  }

  return <div>Unk member event: {event.membership}</div>;
};

const eventViews = {
  'm.room.message': Message,
  'm.room.member': Member,
};

const Room = ({ matrixClient, id }) => {
  const room = matrixClient.getRoom(id);

  if (!room) {
    return null;
  }

  return (
    <div>
      {room.timeline.map(t => {
        const View = eventViews[t.event.type];

        if (!View) {
          console.log(t.event);
          return <div key={t.event.event_id}>Unk event: {t.event.type}</div>;
        }

        return <View event={t.event} key={t.event.event_id} />;
      })}
    </div>
  );
};

export default Room;
