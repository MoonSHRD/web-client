import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import withQueryRenderer from 'hocs/withQueryRenderer';
import CommunityAction from 'components/organisms/CommunityAction';

const User = ({ user, viewer }) => (
  <div>
    <h2>{user.name}</h2>
    <h3>Сообщества</h3>
    {user.ownCommunities.edges.map(
      edge =>
        edge.node && (
          <div key={edge.node.id}>
            <h5>{edge.node.name}</h5>
            <CommunityAction viewer={viewer} data={edge.node} />
          </div>
        )
    )}
  </div>
);

User.propTypes = {
  user: PropTypes.object.isRequired,
  viewer: PropTypes.object.isRequired,
};

const query = graphql`
  query UserQuery($id: ID!) {
    viewer {
      ...CommunityAction_viewer
    }

    user(id: $id) {
      name

      ownCommunities {
        edges {
          node {
            id
            name
            ...CommunityAction
          }
        }
      }
    }
  }
`;

const enhance = withQueryRenderer(query, {
  getVariables: props => ({
    id: props.name,
  }),
});

export default enhance(User);
