import React from 'react';
import PropTypes from 'prop-types';
import ChatSidebar from 'components/ChatSidebar';
import './Chat.css';

const Chat = ({ children, ...props }) => (
  <div styleName="root">
    <ChatSidebar {...props} />
    {children}
  </div>
);

Chat.propTypes = {
  children: PropTypes.any,
};

Chat.defaultProps = {
  children: undefined,
};

export default Chat;
