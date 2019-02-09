/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import RelayEnvironmentContext from 'components/RelayEnvironmentContext';
import commitMutation from 'relay-commit-mutation-promise';

import './UploadFile.css';

const mutation = graphql`
  mutation UploadFileMutation($input: UploadFileInput!) {
    uploadFile(input: $input) {
      policy {
        url
        data
      }
      errors {
        common
        name
      }
    }
  }
`;

const UploadFile = ({ onSuccess, children, accept, className, ...props }) => {
  const relayEnvironment = useContext(RelayEnvironmentContext);
  const uploadEl = useRef(null);

  const openDialog = () => uploadEl.current.click();
  const handleChange = async () => {
    const file = uploadEl.current.files[0];

    const res = await commitMutation(relayEnvironment, {
      mutation,
      variables: {
        input: { name: file.name },
      },
    });

    const { policy = {} } = res.uploadFile;
    const { url, data: formData } = policy;

    const body = new FormData();
    body.append('file', file);

    const data = JSON.parse(formData);
    Object.keys(data).forEach(k => {
      body.append(k, data[k]);
    });

    await fetch(url, {
      method: 'POST',
      body,
    });

    onSuccess({ url: `${url}/${data.key}` });
  };

  return (
    <span styleName="uploadWrapper" className={className} onClick={openDialog} {...props}>
      <input type="file" hidden ref={uploadEl} onChange={handleChange} accept={accept} />
      {children}
    </span>
  );
};

UploadFile.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  accept: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
};

UploadFile.defaultProps = {
  accept: 'image/*',
  children: undefined,
  className: undefined,
};

export default UploadFile;
