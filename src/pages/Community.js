import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';

import withQueryRenderer from 'hocs/withQueryRenderer';

const Community = ({ community, viewer }) => {
  if (!community || !viewer) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <h2>{community.name}</h2>
      {JSON.stringify(community)}
      {JSON.stringify(viewer.groupMembership)}
    </div>
  );
};

const query = graphql`
  query CommunityQuery($id: Int!) {
    community(rowId: $id) {
      id
      name
      shortDescription
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
  community: PropTypes.object,
  viewer: PropTypes.object,
};

Community.defaultProps = {
  community: null,
  viewer: null,
};

export default enhance(Community);
