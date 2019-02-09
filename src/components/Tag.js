import React from 'react';
import PropTypes from 'prop-types';
import './Tag.css';

const Tag = ({ selected, label, ...props }) => (
  <div styleName={`tag ${selected ? 'active' : 'disabled'}`} {...props}>
    <span>{`#${label}`}</span>
  </div>
);

Tag.propTypes = {
  selected: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

Tag.defaultProps = {
  selected: false,
};

export default Tag;
