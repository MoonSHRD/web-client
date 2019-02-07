import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalLink from 'components/atoms/ModalLink';
import { Button, Avatar } from 'antd';
import { connect } from 'react-redux';
import UploadFile from 'components/organisms/UploadFile';
import * as actions from '../store/actions';

const Profile = props => {
  const { logout, matrixClient, user, relayEnvironment } = props;
  const { avatarUrl = '' } = user || {};

  const [avatar, setAvatar] = useState(avatarUrl);

  const update = ({ url }) => {
    setAvatar(url);
    matrixClient.setAvatarUrl(url);
  };

  return (
    <div>
      <h2>Profile</h2>
      <UploadFile onSuccess={update} relayEnvironment={relayEnvironment}>
        <Avatar size={64} src={avatar} />
      </UploadFile>
      <ModalLink component={Button} to="createCommunity">
        Create Community
      </ModalLink>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

Profile.propTypes = {
  logout: PropTypes.func.isRequired,
  matrixClient: PropTypes.object.isRequired,
  relayEnvironment: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const enhance = connect(
  (state, ownProps) => ({ user: ownProps.matrixClient.getUser(state.matrix.userId) }),
  actions
);

export default enhance(Profile);
