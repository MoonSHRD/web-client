import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import './Tab.css';

const Tab = ({ active, iconName }) => (
  <div styleName={`root ${active ? 'active' : 'disabled'}`}>
    <Icon type={iconName} />
  </div>
);

Tab.propTypes = {
  active: PropTypes.bool,
  iconName: PropTypes.string,
};

Tab.defaultProps = {
  active: false,
  iconName: 'minus',
};

export default Tab;
