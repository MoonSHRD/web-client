import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import './CommunityBreadcrumbs.css';

const CommunityBreadcrumbs = ({ items, title }) => (
  <div styleName="root">
    {items.map(item => (
      <span key={item.href}>
        <Link to={item.href}>{item.label}</Link>
        <span styleName="divider">{'>'}</span>
      </span>
    ))}
    <span>{title}</span>
  </div>
);

CommunityBreadcrumbs.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default CommunityBreadcrumbs;
