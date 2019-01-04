import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './MainMenu.css';

const MainMenu = ({ className, logout, ...props }) => (
  <div className={className} styleName="root" {...props}>
    <div styleName="logo" />
    MainMenu
    <Button onClick={logout}>Logout</Button>
  </div>
);

MainMenu.propTypes = {
  logout: PropTypes.func.isRequired,
  className: PropTypes.string,
};

MainMenu.defaultProps = {
  className: undefined,
};

export default MainMenu;
