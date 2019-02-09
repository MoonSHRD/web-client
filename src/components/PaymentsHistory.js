import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'antd';

const columns = [
  {
    title: 'Transaction Hash',
    dataIndex: 'transactionHash',
    key: 'transactionHash',
    render: text => <a href="//">{text}</a>,
  },
  {
    title: 'Block Number',
    dataIndex: 'blockNumber',
    key: 'blockNumber',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
];

const PaymentsHistory = ({ className, error, loading, data }) => {
  if (error) {
    return <div>error: {error.message}</div>;
  }

  return (
    <div className={className}>
      <Table rowKey="transactionHash" loading={loading} columns={columns} dataSource={data} />
    </div>
  );
};

PaymentsHistory.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool,
  data: PropTypes.array,
  error: PropTypes.object,
};

PaymentsHistory.defaultProps = {
  className: undefined,
  loading: false,
  data: [],
  error: undefined,
};

export default PaymentsHistory;
