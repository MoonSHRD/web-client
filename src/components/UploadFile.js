import React, { useState } from 'react';
import { Button, Upload } from 'antd';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
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

const UploadFile = ({ onSuccess, children, relayEnvironment }) => {
  const [file, setFile] = useState();

  const upload = async () => {
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

    setFile(null);
    onSuccess({ url: `${url}/${data.key}` });
  };

  const uploadProps = {
    accept: '.png,.jpg,.jpeg',
    showUploadList: false,
    beforeUpload: f => {
      setFile(f);
      return false;
    },
  };

  return (
    <div styleName="uploadWrapper">
      <Upload styleName="uploadComponent" {...uploadProps}>
        {children}
      </Upload>
      <Button disabled={!file} styleName="uploadButton" onClick={upload}>
        Upload
      </Button>
    </div>
  );
};

UploadFile.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  relayEnvironment: PropTypes.object.isRequired,
  children: PropTypes.any,
};

UploadFile.defaultProps = {
  children: undefined,
};

export default UploadFile;
