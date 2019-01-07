import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button, Input } from 'antd';
import { hasErrors, makeHandleSubmit } from '../utils/form';

const CreateRoomModal = ({ groupId, matrixClient, onClose, navigate, form }) => {
  const handleSubmit = makeHandleSubmit(form, async (formError, values) => {
    if (formError) {
      return;
    }

    const options = {
      name: values.name,
      preset: 'private_chat',
      visibility: 'private',
      initial_state: [
        {
          content: {
            guest_access: 'can_join',
          },
          type: 'm.room.guest_access',
          state_key: '',
        },
      ],
    };

    try {
      const { room_id: roomId } = await matrixClient.createRoom(options);
      await matrixClient.addRoomToGroup(groupId, roomId, true);

      navigate(`/room/${roomId}`);
    } catch (createError) {
      form.setFields({
        name: {
          value: values.localpart,
          errors: [createError],
        },
      });
    }
  });

  return (
    <Modal title="Create Room" onCancel={onClose} visible footer={null}>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="Room Name (optional)">
          {form.getFieldDecorator('name')(<Input placeholder="Example" autoFocus />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(form.getFieldsError())}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

CreateRoomModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  matrixClient: PropTypes.object.isRequired,
  groupId: PropTypes.string.isRequired,
};

const enhance = Form.create();

export default enhance(CreateRoomModal);
