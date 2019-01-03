import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import { camelizeKeys } from 'humps';
import MatrixClientContext from './MatrixClientContext';

const hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field]);

const Login = ({ form, setMatrix }) => {
  const client = useContext(MatrixClientContext);

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

      client
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
};

const enhance = Form.create();

export default enhance(Login);
