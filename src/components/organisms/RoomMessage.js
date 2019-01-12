import React from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { Button } from 'antd';
import './RoomMessage.css';

const Invoice = ({ amount }) => (
  <div>
    Amount: {amount}
    <Button size="small">Pay</Button>
  </div>
);

Invoice.propTypes = {
  amount: PropTypes.number.isRequired,
};

const moonshardViews = {
  invoice: Invoice,
};

const Message = ({ event }) => {
  const m = event.content.body.match(/moonshard:view\/(.*)/);

  if (m) {
    const data = qs.parseUrl(m[1]);
    const View = moonshardViews[data.url];

    if (View) {
      // TODO: check dangerouslySetInnerHTML!!!
      return <View {...data.query} event={event} />;
    }
  }

  return (
    <div styleName="root">
      <div styleName="avatar" />
      <div styleName="text">{event.content.body}</div>
    </div>
  );
};

Message.propTypes = {
  event: PropTypes.object.isRequired,
};

export default Message;
