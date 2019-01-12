import React from 'react';
import PropTypes from 'prop-types';
import { graphql, createFragmentContainer } from 'react-relay';
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

const Message = ({ data }) => {
  const m = data.content.body.match(/moonshard:view\/(.*)/);

  if (m) {
    const params = qs.parseUrl(m[1]);
    const View = moonshardViews[params.url];

    if (View) {
      // TODO: check dangerouslySetInnerHTML!!!
      return <View {...params.query} data={data} />;
    }
  }

  return (
    <div styleName="root">
      <div styleName="avatar" />
      <div styleName="text">{data.content.body}</div>
    </div>
  );
};

Message.propTypes = {
  data: PropTypes.object.isRequired,
};

export default createFragmentContainer(
  Message,
  graphql`
    fragment RoomMessage on RoomMessage {
      id
      content {
        body
      }
    }
  `
);
