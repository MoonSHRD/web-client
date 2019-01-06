import React from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
import { removeKeyFromSearch } from 'utils/url';

const ModalRenderer = ({ modals, ...props }) => (
  <Location>
    {({ location, navigate }) => {
      const openedModals = location.search.match(/([a-z]+)Modal/gi);

      if (!openedModals) {
        return null;
      }

      return openedModals.map(m => {
        const key = m.replace(/Modal$/, '');
        const Modal = modals[key];

        if (!Modal) {
          return null;
        }

        const onClose = () => {
          const newSearch = removeKeyFromSearch(location.search, m);
          navigate(location.pathname + newSearch);
        };

        return <Modal key={key} onClose={onClose} {...props} />;
      });
    }}
  </Location>
);

ModalRenderer.propTypes = {
  modals: PropTypes.object.isRequired,
};

export default ModalRenderer;
