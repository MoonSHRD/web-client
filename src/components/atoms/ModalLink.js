import React from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
import { addKeyToSearch } from 'utils/url';

const ModalLink = ({ to, component, ...props }) => (
  <Location>
    {({ location, navigate }) =>
      React.createElement(component, {
        onClick: () => {
          const newSearch = addKeyToSearch(location.search, `${to}Modal`);
          navigate(location.pathname + newSearch);
        },
        ...props,
      })
    }
  </Location>
);

ModalLink.propTypes = {
  to: PropTypes.string.isRequired,
  component: PropTypes.any,
};

ModalLink.defaultProps = {
  component: 'span',
};

export default ModalLink;
