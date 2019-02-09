import React from 'react';
import PropTypes from 'prop-types';
import './RoomEvent.css';

const RoomEvent = ({ data }) => (
  <div styleName="root">
    <div styleName="label">{data.event.type}</div>
  </div>
);

RoomEvent.propTypes = {
  data: PropTypes.object.isRequired,
};

export default RoomEvent;
