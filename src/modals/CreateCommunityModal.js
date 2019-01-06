import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

const CreateCommunityModal = ({ onClose }) => (
  <Modal title="Create Community" onCancel={onClose} visible>
    <div>CreateCommunityModal</div>
  </Modal>
);

CreateCommunityModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CreateCommunityModal;
