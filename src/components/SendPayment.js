import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

import { Form, Input, Button } from 'antd';

import { fetchData } from 'components/hooks/useAbortableFetch';

import { hasErrors, makeHandleSubmit } from 'utils/form';

import './SendPayment.css';

const SendPayment = ({ className, form, onSuccess }) => {
  const [loading, setLoading] = useState(0);
  const [state, setState] = useState({});

  const handleSubmit = makeHandleSubmit(form, async (err, values) => {
    if (err) {
      return;
    }

    setLoading(prevLoadState => prevLoadState + 1);

    const query = new URLSearchParams({
      toAddress: values.recipient,
      amount: values.amount,
    }).toString();

    await fetchData(`//localhost:3000/api/token/transfer-tokens?${query}`, setState, { method: 'POST' });

    onSuccess();

    form.setFields({
      amount: {
        value: '',
      },
      recipient: {
        value: '',
      },
    });

    setLoading(prevLoadState => prevLoadState - 1);
  });

  if (state.error) {
    return <div>error: {state.error.message}</div>;
  }

  return (
    <Form layout="inline" onSubmit={handleSubmit} className={className} styleName="root">
      <Form.Item>
        {form.getFieldDecorator('recipient', {
          rules: [{ required: true, message: 'Please input payment recipient' }],
        })(<Input placeholder="To" />)}
      </Form.Item>
      <Form.Item>
        {form.getFieldDecorator('amount', { rules: [{ required: true, message: 'Please input your amount' }] })(
          <Input placeholder="Amount" />
        )}
      </Form.Item>
      <Form.Item>
        <Button loading={!!loading} type="primary" htmlType="submit" disabled={hasErrors(form.getFieldsError())}>
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

SendPayment.propTypes = {
  form: PropTypes.object.isRequired,
  className: PropTypes.string,
  onSuccess: PropTypes.func,
};

SendPayment.defaultProps = {
  className: undefined,
  onSuccess: undefined,
};

const enhance = Form.create();

export default enhance(SendPayment);
