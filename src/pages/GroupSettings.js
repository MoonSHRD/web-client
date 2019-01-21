import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Upload, Button, Icon } from 'antd';
import { graphql } from 'react-relay';
import { navigate } from '@reach/router';
import commitMutation from 'relay-commit-mutation-promise';

const mutation = graphql`
  mutation GroupSettingsUploadGroupAvatarMutation($input: UploadGroupAvatarInput!) {
    uploadGroupAvatar(input: $input) {
      postURL
      formData

      group {
        id
        avatarUrl
      }
    }
  }
`;

const GroupSettings = ({ id, relayEnvironment }) => {
  const [file, setFile] = useState();

  const upload = async () => {
    const res = await commitMutation(relayEnvironment, {
      mutation,
      variables: {
        input: { groupId: id, ext: 'png' },
      },
    });

    const { postURL, formData } = res.uploadGroupAvatar;

    const body = new FormData();
    body.append('file', file);

    const data = JSON.parse(formData);
    Object.keys(data).forEach(k => {
      body.append(k, data[k]);
    });

    await fetch(postURL, {
      method: 'POST',
      body,
    });

    navigate('/');
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
    <div>
      <Upload {...uploadProps}>
        <Button>
          <Icon type="upload" /> Select File
        </Button>
      </Upload>
      <Button onClick={upload}>Save</Button>
    </div>
  );
};

GroupSettings.propTypes = {
  id: PropTypes.string,
  relayEnvironment: PropTypes.object.isRequired,
};

GroupSettings.defaultProps = {
  id: undefined,
};

export default GroupSettings;
