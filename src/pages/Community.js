import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';

import withQueryRenderer from 'hocs/withQueryRenderer';
import Chat from 'components/templates/Chat';

const Community = ({ group, viewer }) => {
  const { groupMembership = [] } = viewer || {};

  return (
    <Chat matrixRooms={{}}>
      zaluuupa
      {JSON.stringify(group)}
      {JSON.stringify(groupMembership)}
    </Chat>
  );
};

const query = graphql`
  query CommunityQuery($id: ID!) {
    group(id: $id) {
      id
      name
      shortDescription
      longDescription
      isPublic
    }

    viewer {
      groupMembership(isAdmin: true) {
        groupId
        isAdmin
      }
    }
  }
`;

const enhance = withQueryRenderer(query, {
  getVariables: props => ({
    id: props.id,
  }),
});

Community.propTypes = {
  group: PropTypes.object,
  viewer: PropTypes.object,
};

Community.defaultProps = {
  group: {},
  viewer: {},
};

export default enhance(Community);
