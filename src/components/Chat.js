import React from 'react';
import PropTypes from 'prop-types';
import ChatSidebar from 'components/ChatSidebar';
import './Chat.css';

const Chat = ({ children, location }) => (
  <div styleName="root">
    <ChatSidebar location={location} />
    {children}
  </div>
);

Chat.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object.isRequired,
};

Chat.defaultProps = {
  children: undefined,
};

export default Chat;
