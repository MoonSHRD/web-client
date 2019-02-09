import React, { useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import RoomMessage from 'components/RoomMessage';
import './RoomTimeline.css';

const RoomTimeline = ({ timeline, room }) => {
  const rootEl = useRef(null);

  useLayoutEffect(
    () => {
      rootEl.current.scrollTo(0, rootEl.current.scrollHeight);
    },
    [rootEl, timeline]
  );

  return (
    <div styleName="timeline" ref={rootEl}>
      {room.timeline.map(e => {
        if (e.event.type === 'm.room.message') {
          return <RoomMessage key={e.event.event_id} data={e} room={room} />;
        }

        return <div key={e.event.event_id}>{e.event.type}</div>;
      })}
    </div>
  );
};

RoomTimeline.propTypes = {
  timeline: PropTypes.array.isRequired,
  room: PropTypes.array.isRequired,
};

export default RoomTimeline;
