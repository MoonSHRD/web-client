import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Menu, Dropdown } from 'antd';
import { EventStatus } from 'matrix-js-sdk';
import MatrixClientContext from 'components/MatrixClientContext';
import UnknownMessageBody from 'components/UnknownMessageBody';
import './RoomMessage.css';

const getBody = data => {
  const { event } = data;

  if (event.content.msgtype === 'image') {
    return <img src={event.content.url} alt={event.content.body} />;
  }

  return event.content.body || <UnknownMessageBody event={data} />;
};

const Message = ({ data, room }) => {
  const { event, status } = data;
  const cli = useContext(MatrixClientContext);
  const user = cli.getUser(cli.getUserId());

  const handleMenuClick = e => {
    if (e.key === 'remove') {
      cli.redactEvent(data.getRoomId(), data.getId());
    }
  };

  // status is SENT before remote-echo, null after
  const isSent = !status || status === EventStatus.SENT;
  const canRedact = room.currentState.maySendRedactionForEvent(data, cli.credentials.userId);

  const menuItems = [];

  if (isSent && canRedact) {
    menuItems.push(<Menu.Item key="remove">Удалить</Menu.Item>);
  }

  const menu = menuItems.length > 0 && <Menu onClick={handleMenuClick}>{menuItems}</Menu>;

  return (
    <div styleName="root">
      {user.avatarUrl ? (
        <img src={user.avatarUrl} styleName="avatar" alt={cli.getUserId()} />
      ) : (
        <div styleName="avatar" />
      )}
      <div styleName="content">
        <div styleName="text">
          <Link to={`/user/${event.sender}`} styleName="sender">
            {event.sender}
          </Link>
          {getBody(data)}
          {menu && (
            <Dropdown overlay={menu}>
              <div>...</div>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  data: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
};

export default Message;
