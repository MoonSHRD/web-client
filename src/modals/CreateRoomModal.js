import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { graphql } from 'react-relay';
import withMutation from 'hocs/withMutation';
import { Modal, Form, Button, Input } from 'antd';
import qs from 'query-string';
import { hasErrors, makeHandleSubmit, getFieldErrors } from '../utils/form';

const CreateRoomModal = ({ save, onClose, form }) => {
  const handleSubmit = makeHandleSubmit(form, async (formError, values) => {
    if (formError) {
      return;
    }

    save(values);
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
  save: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};

const mutation = graphql`
  mutation CreateRoomModalMutation($input: CreateRoomInput!) {
    createRoom(input: $input) {
      edge {
        node {
          id
          name
        }
      }

      errors {
        common
        name
      }
    }
  }
`;

const enhance = compose(
  Form.create(),
  withMutation('save', (props, values) => ({
    mutation,
    variables: {
      input: {
        ...values,
        communityId: props.communityId,
      },
    },
    configs: [
      {
        type: 'RANGE_ADD',
        parentID: props.communityId,
        connectionInfo: [
          {
            key: 'GroupCollapse_rooms',
            rangeBehavior: 'append',
          },
        ],
        edgeName: 'edge',
      },
    ],
    onCompleted: ({ createRoom }) => {
      if (createRoom.errors) {
        props.form.setFields(getFieldErrors(props.form, values, createRoom.errors));
        return;
      }

      const search = qs.stringify({
        openedCommunity: props.communityId,
      });

      props.navigate(`/room/${createRoom.edge.node.id}?${search}`);
    },
  }))
);

export default enhance(CreateRoomModal);
