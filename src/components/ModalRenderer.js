import React from 'react';
import PropTypes from 'prop-types';
import { removeKeyFromSearch } from 'utils/url';
import qs from 'query-string';

const ModalRenderer = ({ modals, location, navigate, ...props }) => {
  const query = qs.parse(location.search);
  const openedModals = Object.keys(query).filter(k => k.match(/Modal$/));

  if (openedModals.length === 0) {
    return null;
  }

  return openedModals.map(m => {
    const key = m.replace(/Modal$/, '');
    const Modal = modals[key];

    if (!Modal) {
      return null;
    }

    const params = query[m] ? JSON.parse(query[m]) : {};
    const onClose = () => {
      const newSearch = removeKeyFromSearch(location.search, m);
      navigate(location.pathname + newSearch);
    };

    return <Modal key={key} onClose={onClose} location={location} navigate={navigate} {...params} {...props} />;
  });
};

ModalRenderer.propTypes = {
  modals: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default ModalRenderer;
