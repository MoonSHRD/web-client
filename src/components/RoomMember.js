import React from 'react';
import PropTypes from 'prop-types';

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

export default Member;
