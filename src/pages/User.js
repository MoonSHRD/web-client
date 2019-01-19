import React from 'react';
import PropTypes from 'prop-types';

const User = ({ name }) => (
  <div>
    <h2>{name}</h2>
  </div>
);

User.propTypes = {
  name: PropTypes.string,
};

User.defaultProps = {
  name: '',
};

export default User;
