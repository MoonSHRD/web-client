import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import { hasErrors, makeHandleSubmit } from '../utils/form';

const SendMessage = ({ matrixClient, form, roomId }) => {
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
    <Form layout="inline" onSubmit={handleSubmit}>
      <Form.Item>
        {form.getFieldDecorator('message', { rules: [{ required: true, message: 'Please input your message!' }] })(
          <Input placeholder="Message" autoFocus />
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={hasErrors(form.getFieldsError())}>
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

SendMessage.propTypes = {
  matrixClient: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  roomId: PropTypes.string.isRequired,
};

const enhance = Form.create();

export default enhance(SendMessage);
