import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import s from './IconItem.css';

const ItemIcon = ({ children, component, icon, active, ...props }) =>
  React.createElement(
    component,
    {
      className: active ? s.active : s.normal,
      ...props,
    },
    <React.Fragment>
      <Icon type={icon} styleName="icon" />
      {children}
    </React.Fragment>
  );

ItemIcon.propTypes = {
  children: PropTypes.any,
  component: PropTypes.any,
  icon: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

ItemIcon.defaultProps = {
  component: 'div',
  children: undefined,
  active: false,
};

export default ItemIcon;
