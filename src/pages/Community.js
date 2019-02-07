import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { Avatar } from 'antd';
import { compose } from 'redux';
import CommunityAction from 'components/organisms/CommunityAction';
import UploadFile from 'components/organisms/UploadFile';

import withQueryRenderer from 'hocs/withQueryRenderer';
import withMutation from 'hocs/withMutation';

const Community = ({ community, viewer, update, relayEnvironment }) => {
  if (!community || !viewer) {
    return <div>Not found</div>;
  }

  return (
    <Fragment>
      <h2>{community.name}</h2>
      <UploadFile onSuccess={update} relayEnvironment={relayEnvironment}>
        <Avatar size={64} src={community.avatarUrl} />
      </UploadFile>
      <CommunityAction viewer={viewer} data={community} />
    </Fragment>
  );
};

const updateCommunityMutation = graphql`
  mutation CommunityMutation($input: UpdateCommunityInput!) {
    updateCommunity(input: $input) {
      edge {
        node {
          id
          name
          avatarUrl
        }
      }
      errors {
        common
        name
      }
    }
  }
`;

const query = graphql`
  query CommunityQuery($id: ID!) {
    community(id: $id) {
      id
      name
      avatarUrl
      shortDescription
      ...CommunityAction
    }

    viewer {
      ...CommunityAction_viewer
    }
  }
`;

const enhance = compose(
  withQueryRenderer(query, {
    getVariables: props => ({
      id: props.id,
    }),
  }),
  withMutation('update', (props, input = {}) => {
    const sharedUpdater = store => {
      const community = store.get(props.community.id);
      community.setValue(input.url, 'avatarUrl');
    };

    return {
      mutation: updateCommunityMutation,
      variables: {
        input: {
          id: props.community.id,
          avatarUrl: input.url,
        },
      },
      optimisticUpdater: sharedUpdater,
      updater: sharedUpdater,
    };
  })
);

Community.propTypes = {
  relayEnvironment: PropTypes.object.isRequired,
  update: PropTypes.func,
  community: PropTypes.object,
  viewer: PropTypes.object,
};

Community.defaultProps = {
  community: null,
  viewer: null,
  update: () => {},
};

export default enhance(Community);
