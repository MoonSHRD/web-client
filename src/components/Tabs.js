import React from 'react';
// import PropTypes from 'prop-types';
import Tab from 'components/Tab';
import './Tabs.css';

const Tabs = () => (
  <div styleName="root">
    <Tab iconName="team" />
    <Tab active iconName="message" />
  </div>
);

Tabs.propTypes = {};

Tabs.defaultProps = {};

export default Tabs;
