import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon } from 'antd';
import { makeHandleSubmit } from '../utils/form';
import './SendMessage.css';

const SendMessage = ({ className, matrixClient, form, roomId }) => {
  const handleSubmit = makeHandleSubmit(form, (err, values) => {
    if (err) {
      return;
    }

    matrixClient.sendTextMessage(roomId, values.message);

    form.setFields({
      message: {
        value: '',
      },
    });
  });

  return (
    <form onSubmit={handleSubmit} className={className}>
      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
      <label htmlFor="chat-input">
        <div styleName="wrapper">
          <Icon type="paper-clip" styleName="paperClip" />
          {/* eslint-disable jsx-a11y/no-autofocus */}
          {form.getFieldDecorator('message', { rules: [{ required: true, message: 'Please input your message!' }] })(
            <input
              placeholder="Новое сообщение"
              id="chat-input"
              autoFocus
              autoComplete="off"
              styleName="messageInput"
            />
          )}
          <Icon type="sound" styleName="sound" />
          <Icon type="smile" styleName="smile" />
          <button type="submit" styleName="mailButton">
            <Icon type="mail" styleName="mail" />
          </button>
        </div>
      </label>
    </form>
  );
};

SendMessage.propTypes = {
  matrixClient: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  roomId: PropTypes.string.isRequired,
  className: PropTypes.string,
};

SendMessage.defaultProps = {
  className: undefined,
};

const enhance = Form.create();

export default enhance(SendMessage);
