import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Icon } from 'antd';
import s from './MainMenu.css';

const getIconLinkClass = ({ isCurrent }) => ({
  className: isCurrent ? s.activeLink : s.link,
});

const IconLink = props => <Link {...props} getProps={getIconLinkClass} />;

const links = [
  {
    to: '/profile',
    icon: 'user',
  },
  {
    to: '/communities',
    icon: 'ordered-list',
  },
  {
    to: '/',
    icon: 'message',
  },
  {
    to: '/favorites',
    icon: 'star',
  },
  {
    to: '/payments',
    icon: 'wallet',
  },
  {
    to: '/settings',
    icon: 'setting',
  },
];

const MainMenu = ({ className, ...props }) => (
  <div className={className} styleName="root" {...props}>
    <Link to="/">
      <div styleName="logo" />
    </Link>
    {links.map(item => (
      <IconLink to={item.to} ke={item.to}>
        <Icon type={item.icon} />
      </IconLink>
    ))}
  </div>
);

MainMenu.propTypes = {
  className: PropTypes.string,
};

MainMenu.defaultProps = {
  className: undefined,
};

export default MainMenu;
