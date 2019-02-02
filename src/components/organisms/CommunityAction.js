import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import { Button } from 'antd';
import withMutation from 'hocs/withMutation';
import { compose } from 'redux';

const CommunityAction = ({ viewer, data, join, leave }) => {
  const joined = viewer.joinedCommunityIds.includes(data.id);
  const action = joined ? leave : join;

  return <Button onClick={action}>{joined ? 'Присоединиться' : 'Покинуть'}</Button>;
};

CommunityAction.propTypes = {
  viewer: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  join: PropTypes.func.isRequired,
  leave: PropTypes.func.isRequired,
};

const joinMutation = graphql`
  mutation CommunityActionJoinMutation($input: JoinCommunityInput!) {
    joinCommunity(input: $input) {
      userEdge {
        node {
          id
        }
      }
    }
  }
`;

const leaveMutation = graphql`
  mutation CommunityActionLeaveMutation($input: LeaveCommunityInput!) {
    leaveCommunity(input: $input) {
      deletedId
    }
  }
`;

const enhance = compose(
  withMutation('join', props => {
    const sharedUpdater = store => {
      const viewer = store.get(props.viewer.id);
      const joinedIds = [...viewer.getValue('joinedCommunityIds'), props.data.id];
      viewer.setValue(joinedIds, 'joinedCommunityIds');
    };

    return {
      mutation: joinMutation,
      variables: {
        input: { communityId: props.data.id },
      },
      optimisticUpdater: sharedUpdater,
      updater: sharedUpdater,
    };
  }),
  withMutation('leave', props => {
    const sharedUpdater = store => {
      const viewer = store.get(props.viewer.id);
      const joinedIds = viewer.getValue('joinedCommunityIds').filter(id => id !== props.data.id);
      viewer.setValue(joinedIds, 'joinedCommunityIds');
    };

    return {
      mutation: leaveMutation,
      variables: {
        input: { communityId: props.data.id },
      },
      optimisticUpdater: sharedUpdater,
      updater: sharedUpdater,
    };
  })
);

export default createFragmentContainer(
  enhance(CommunityAction),
  graphql`
    fragment CommunityAction on Community {
      id
    }

    fragment CommunityAction_viewer on Viewer {
      id
      joinedCommunityIds
    }
  `
);
