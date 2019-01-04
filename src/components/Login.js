import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import { camelizeKeys } from 'humps';
import { hasErrors } from '../utils/form';

const Login = ({ matrixClient, form, setMatrix }) => {
  const handleSubmit = e => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      const options = {
        identifier: {
          type: 'm.id.user',
          user: values.user,
        },
        password: values.password,
      };

      matrixClient
        .login('m.login.password', options)
        .then(camelizeKeys)
        .then(setMatrix)
        .catch(matrixError => {
          form.setFields({
            password: { value: '', errors: [matrixError] },
          });
        });
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        {form.getFieldDecorator('user', { rules: [{ required: true, message: 'Please input your username!' }] })(
          <Input placeholder="Username" />
        )}
      </Form.Item>
      <Form.Item>
        {form.getFieldDecorator('password', { rules: [{ required: true, message: 'Please input your password!' }] })(
          <Input placeholder="password" />
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={hasErrors(form.getFieldsError())}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

Login.propTypes = {
  form: PropTypes.object.isRequired,
  setMatrix: PropTypes.func.isRequired,
  matrixClient: PropTypes.object.isRequired,
};

const enhance = Form.create();

export default enhance(Login);
