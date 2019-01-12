import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import './MainMenu.css';

const MainMenu = ({ className, ...props }) => (
  <div className={className} styleName="root" {...props}>
    <div styleName="logo" />
    <div styleName="item">
      <Link to="/">Home</Link>
    </div>
    <div styleName="item">
      <Link to="/profile">Profile</Link>
    </div>
    <div styleName="item">
      <Link to="/payments">Payments</Link>
    </div>
    <div styleName="item">
      <Link to="/settings">Settings</Link>
    </div>
  </div>
);

MainMenu.propTypes = {
  className: PropTypes.string,
};

MainMenu.defaultProps = {
  className: undefined,
};

export default MainMenu;
