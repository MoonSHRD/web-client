import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { requestSubscription, graphql } from 'react-relay';
import QueryLookupRenderer from 'relay-query-lookup-renderer';
import SendMessage from 'components/SendMessage';
import RoomTimeline from 'components/organisms/RoomTimeline';
import RoomHeader from 'components/molecules/RoomHeader';
import RelayEnvironmentContext from 'components/RelayEnvironmentContext';
import QueryRendererError from 'components/molecules/QueryRendererError';
import Loading from 'components/molecules/Loading';
import Chat from 'components/templates/Chat';
import './Room.css';

const subscription = graphql`
  subscription RoomSubscription($input: NewRoomMessageInput!) {
    newRoomMessage(input: $input) {
      edge {
        node {
          id
          ...RoomMessage
        }
      }
    }
  }
`;

const query = graphql`
  query RoomQuery($id: ID!) {
    viewer {
      room(id: $id) {
        id

        messages(last: 30) @connection(key: "Room_messages") {
          edges {
            ...RoomTimeline_messageEdges
          }
        }
      }
    }
  }
`;

const Room = ({ id, matrixClient }) => {
  const relayEnvironment = useContext(RelayEnvironmentContext);

  useEffect(
    () => {
      const sub = requestSubscription(relayEnvironment, {
        subscription,
        variables: {
          input: { roomId: id },
        },
        onCompleted: () => {
          console.log('stop listen');
        },
        onError: err => {
          console.log(err);
        },
        configs: [
          {
            type: 'RANGE_ADD',
            parentID: id,
            connectionInfo: [
              {
                key: 'Room_messages',
                rangeBehavior: 'append',
              },
            ],
            edgeName: 'edge',
          },
        ],
      });

      return () => sub.dispose();
    },
    [relayEnvironment, id]
  );

  return (
    <Chat>
      <QueryLookupRenderer
        lookup
        environment={relayEnvironment}
        query={query}
        variables={{ id }}
        render={({ props, retry, error }) => {
          if (error) {
            return <QueryRendererError error={error} retry={retry} />;
          }

          if (!props) {
            return <Loading />;
          }

          // eslint-disable-next-line react/prop-types
          if (!props.viewer) {
            return <div>Viewer not found</div>;
          }

          // eslint-disable-next-line react/prop-types
          const { room } = props.viewer;

          return (
            <div styleName="root">
              <RoomHeader />
              <RoomTimeline messageEdges={room.messages.edges} />
              <SendMessage styleName="send" matrixClient={matrixClient} roomId={room.id} />
            </div>
          );
        }}
      />
    </Chat>
  );
};

Room.propTypes = {
  id: PropTypes.string,
  matrixClient: PropTypes.object.isRequired,
};

Room.defaultProps = {
  id: null,
};

export default Room;
