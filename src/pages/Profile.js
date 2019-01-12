import React from 'react';
import PropTypes from 'prop-types';
import ModalLink from 'components/atoms/ModalLink';
import { Button } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

const Profile = ({ logout }) => (
  <div>
    <h2>Profile</h2>
    <ModalLink component={Button} to="createCommunity">
      Create Community
    </ModalLink>
    <Button onClick={logout}>Logout</Button>
  </div>
);

Profile.propTypes = {
  logout: PropTypes.func.isRequired,
};

const enhance = connect(
  null,
  actions
);

export default enhance(Profile);
