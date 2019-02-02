import React from 'react';
import PropTypes from 'prop-types';
import sdk from 'matrix-js-sdk';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { Button, Form, Input } from 'antd';
import * as actions from 'store/actions';
import { hasErrors, makeHandleSubmit } from '../utils/form';
import './Signup.css';

const Signup = ({ form, updateMatrix }) => {
  const handleSubmit = makeHandleSubmit(form, async (formError, values) => {
    if (formError) {
      return;
    }

    const client = sdk.createClient({
      baseUrl: process.env.MATRIX_ENDPOINT || 'https://13.59.234.201.xip.io',
    });

    try {
      const matrix = await client.register(values.username, values.password, null, { type: 'm.login.dummy' }, {});
      updateMatrix(matrix);
      navigate('/');
    } catch (e) {
      form.setFields({
        username: {
          value: values.username,
          errors: [e],
        },
      });
    }
  });

  return (
    <Form onSubmit={handleSubmit} styleName="root">
      <Form.Item>
        <Form.Item label="Имя">
          {form.getFieldDecorator('username', { rules: [{ required: true, message: 'Имя обязательно' }] })(
            <Input autoFocus />
          )}
        </Form.Item>
        <Form.Item label="Пароль">
          {form.getFieldDecorator('password', { rules: [{ required: true, message: 'Пароль обязателен' }] })(<Input />)}
        </Form.Item>
        <Button type="primary" htmlType="submit" disabled={hasErrors(form.getFieldsError())}>
          Зарегистироваться
        </Button>
      </Form.Item>
    </Form>
  );
};

Signup.propTypes = {
  form: PropTypes.object.isRequired,
  updateMatrix: PropTypes.func.isRequired,
};

const enhance = compose(
  connect(
    null,
    actions
  ),
  Form.create()
);

export default enhance(Signup);
