import React from 'react';
import PropTypes from 'prop-types';
import ChatSidebar from 'components/organisms/ChatSidebar';
import './Chat.css';

const Chat = ({ children, selectedRoom }) => (
  <div styleName="root">
    <ChatSidebar selectedRoom={selectedRoom} />
    {children}
  </div>
);

Chat.propTypes = {
  children: PropTypes.any,
  selectedRoom: PropTypes.string,
};

Chat.defaultProps = {
  children: undefined,
  selectedRoom: '',
};

export default Chat;
