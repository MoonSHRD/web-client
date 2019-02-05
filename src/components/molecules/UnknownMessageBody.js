import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import './UnknownMessageBody.css';

const getTooltip = event => {
  if (event.isRedacted()) {
    const redactedBecauseUserId = event.getUnsigned().redacted_because.sender;
    return `Сообщение удалено ${redactedBecauseUserId}`;
  }

  return 'Удалено или имеет неизвестный тип';
};

const UnknownMessageBody = ({ event }) => (
  <Tooltip placement="top" title={getTooltip(event)}>
    <span styleName="root" />
  </Tooltip>
);

UnknownMessageBody.propTypes = {
  event: PropTypes.object.isRequired,
};

export default UnknownMessageBody;
