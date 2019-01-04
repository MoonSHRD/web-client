import React from 'react';
import PropTypes from 'prop-types';
import './MainMenu.css';

const MainMenu = ({ className, ...props }) => (
  <div className={className} styleName="root" {...props}>
    <div styleName="logo" />
    MainMenu
  </div>
);

MainMenu.propTypes = {
  className: PropTypes.string,
};

MainMenu.defaultProps = {
  className: undefined,
};

export default MainMenu;
