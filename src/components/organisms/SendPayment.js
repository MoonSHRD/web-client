import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

import { Form, Input, Button } from 'antd';

import { hasErrors, makeHandleSubmit } from '../../utils/form';

import './SendPayment.css';

const SendPayment = ({ className, form }) => {
  const handleSubmit = makeHandleSubmit(form, (err /* values */) => {
    if (err) {
      return;
    }

    form.setFields({
      amount: {
        value: '',
      },
      to: {
        value: '',
      },
    });
  });

  return (
    <Form layout="inline" onSubmit={handleSubmit} className={className} styleName="root">
      <Form.Item>
        {form.getFieldDecorator('amount', { rules: [{ required: true, message: 'Please input your amount' }] })(
          <Input placeholder="Amount" />
        )}
      </Form.Item>
      <Form.Item>
        {form.getFieldDecorator('message', { rules: [{ required: true, message: 'Please input payment recipient' }] })(
          <Input placeholder="To" />
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

SendPayment.propTypes = {
  form: PropTypes.object.isRequired,
  className: PropTypes.string,
};

SendPayment.defaultProps = {
  className: undefined,
};

const enhance = Form.create();

export default enhance(SendPayment);
