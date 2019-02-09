import React from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
import { addKeyToSearch } from 'utils/url';

const ModalLink = ({ to, component, params, ...props }) => (
  <Location>
    {({ location, navigate }) =>
      React.createElement(component, {
        onClick: () => {
          const newSearch = addKeyToSearch(location.search, `${to}Modal`, params);
          navigate(location.pathname + newSearch);
        },
        ...props,
      })
    }
  </Location>
);

ModalLink.propTypes = {
  to: PropTypes.string.isRequired,
  params: PropTypes.object,
  component: PropTypes.any,
};

ModalLink.defaultProps = {
  component: 'span',
  params: null,
};

export default ModalLink;
