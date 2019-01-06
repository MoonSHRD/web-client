import React from 'react';
import PropTypes from 'prop-types';
import ChatSidebar from 'components/organisms/ChatSidebar';
import './Chat.css';

const Chat = ({ matrixRooms, children }) => (
  <div styleName="root">
    <ChatSidebar rooms={matrixRooms} />
    {children}
  </div>
);

Chat.propTypes = {
  matrixRooms: PropTypes.object.isRequired,
  children: PropTypes.any,
};

Chat.defaultProps = {
  children: undefined,
};

export default Chat;
