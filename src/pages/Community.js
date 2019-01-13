import React from 'react';
import PropTypes from 'prop-types';
import Chat from 'components/templates/Chat';
import { graphql, QueryRenderer } from 'react-relay';

const query = graphql`
  query CommunityQuery($id: ID!) {
    group(id: $id) {
      id
      name
      shortDescription
      longDescription
      isPublic
    }
  }
`;

const Community = ({ relayEnvironment, id }) => (
  <Chat matrixRooms={{}}>
    <QueryRenderer
      environment={relayEnvironment}
      query={query}
      variables={{ id }}
      render={({ props, error }) => {
        if (error) {
          return <div>Error: {error.toString()}</div>;
        }

        if (!props) {
          return <div>Loading...</div>;
        }

        // eslint-disable-next-line react/prop-types
        const { group } = props;

        if (!group) {
          return <div>Community not found</div>;
        }

        return <pre>{JSON.stringify(group)}</pre>;
      }}
    />
  </Chat>
);

Community.propTypes = {
  relayEnvironment: PropTypes.object.isRequired,
  id: PropTypes.string,
};

Community.defaultProps = {
  id: null,
};

export default Community;
