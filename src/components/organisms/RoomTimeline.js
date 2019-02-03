import React, { useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import RoomMessage from 'components/organisms/RoomMessage';
import './RoomTimeline.css';

const RoomTimeline = ({ data }) => {
  const rootEl = useRef(null);

  useLayoutEffect(
    () => {
      rootEl.current.scrollTo(0, rootEl.current.scrollHeight);
    },
    [rootEl, data]
  );

  return (
    <div styleName="timeline" ref={rootEl}>
      {data.map(e => {
        if (e.event.type === 'm.room.message') {
          return <RoomMessage key={e.event.event_id} data={e.event} />;
        }

        return <div key={e.event.event_id}>{e.event.type}</div>;
      })}
    </div>
  );
};

RoomTimeline.propTypes = {
  data: PropTypes.array.isRequired,
};

export default RoomTimeline;
