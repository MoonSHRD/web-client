import React, { useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import RoomMessage from 'components/RoomMessage';
import RoomEvent from 'components/RoomEvent';
import './RoomTimeline.css';

const RoomTimeline = ({ room }) => {
  const rootEl = useRef(null);

  useLayoutEffect(
    () => {
      rootEl.current.scrollTo(0, rootEl.current.scrollHeight);
    },
    [rootEl, room.timeline]
  );

  return (
    <div styleName="timeline" ref={rootEl}>
      {room.timeline.map(e => {
        if (e.event.type === 'm.room.message') {
          return <RoomMessage key={e.event.event_id} data={e} room={room} />;
        }

        return <RoomEvent key={e.event.event_id} data={e} />;
      })}
    </div>
  );
};

RoomTimeline.propTypes = {
  room: PropTypes.object.isRequired,
};

export default RoomTimeline;
