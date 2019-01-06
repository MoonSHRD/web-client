import React from 'react';
import PropTypes from 'prop-types';

const PaymentsHistory = ({ className }) => <div className={className}>PaymentsHistory</div>;

PaymentsHistory.propTypes = {
  className: PropTypes.string,
};

PaymentsHistory.defaultProps = {
  className: undefined,
};

export default PaymentsHistory;
