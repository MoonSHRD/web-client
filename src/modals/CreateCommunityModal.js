import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button, Input } from 'antd';
import { hasErrors, makeHandleSubmit } from '../utils/form';

const CreateCommunityModal = ({ matrixClient, onClose, navigate, form }) => {
  const handleSubmit = makeHandleSubmit(form, (formError, values) => {
    if (formError) {
      return;
    }

    const profile = {
      name: values.name,
    };

    matrixClient
      .createGroup({ localpart: values.localpart, profile })
      .then(res => navigate(`/community/${res.group_id}`))
      .catch(createError => {
        form.setFields({
          localpart: {
            value: values.localpart,
            errors: [createError],
          },
        });
      });
  });

  return (
    <Modal title="Create Community" onCancel={onClose} visible footer={null}>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="Community Name">
          {form.getFieldDecorator('name', { rules: [{ required: true, message: 'Please input community name!' }] })(
            <Input placeholder="Example" autoFocus />
          )}
        </Form.Item>
        <Form.Item label="Community ID">
          {form.getFieldDecorator('localpart', { rules: [{ required: true, message: 'Please input community ID!' }] })(
            <Input placeholder="example" autoFocus />
          )}
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

CreateCommunityModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  matrixClient: PropTypes.object.isRequired,
};

const enhance = Form.create();

export default enhance(CreateCommunityModal);
