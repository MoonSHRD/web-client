import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { graphql } from 'react-relay';
import withMutation from 'hocs/withMutation';
import { Modal, Form, Button, Input } from 'antd';
import { hasErrors, makeHandleSubmit, getFieldErrors } from '../utils/form';

const CreateCommunityModal = ({ onClose, form, save }) => {
  const handleSubmit = makeHandleSubmit(form, (formError, values) => {
    if (formError) {
      return;
    }

    save({
      ...values,
      tags: [],
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
  save: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};

const mutation = graphql`
  mutation CreateCommunityModalMutation($input: CreateCommunityInput!) {
    createCommunity(input: $input) {
      edge {
        node {
          id
          name
          rowId
        }
      }

      errors {
        name
      }
    }
  }
`;

const enhance = compose(
  Form.create(),
  withMutation('save', (props, input) => ({
    mutation,
    variables: { input },
    onCompleted: ({ createCommunity }) => {
      if (createCommunity.errors) {
        props.form.setFields(getFieldErrors(props.form, input, createCommunity.errors));
        return;
      }

      props.navigate(`/community/${createCommunity.edge.node.rowId}`);
    },
  }))
);

export default enhance(CreateCommunityModal);
