import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import './Search.css';

const Search = ({ type, placeholder, children, className }) => (
  <label styleName="root" className={className} htmlFor="search-input">
    <Icon type="search" styleName={`icon ${type}`} />
    <input styleName={`input ${type}-input`} id="search-input" placeholder={placeholder} />
    {children}
  </label>
);

Search.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
};

Search.defaultProps = {
  type: 'light',
  placeholder: 'Поиск',
  children: undefined,
  className: '',
};

export default Search;
