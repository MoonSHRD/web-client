import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import CommunityAction from 'components/organisms/CommunityAction';

import withQueryRenderer from 'hocs/withQueryRenderer';

const Community = ({ community, viewer }) => {
  if (!community || !viewer) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <h2>{community.name}</h2>
      <CommunityAction viewer={viewer} data={community} />
    </div>
  );
};

const query = graphql`
  query CommunityQuery($id: ID!) {
    community(id: $id) {
      id
      name
      shortDescription
      ...CommunityAction
    }

    viewer {
      ...CommunityAction_viewer
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
