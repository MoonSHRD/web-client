import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { QueryRenderer, requestSubscription, graphql } from 'react-relay';
import SendMessage from 'components/SendMessage';
import RoomMessage from 'components/organisms/RoomMessage';
import RoomHeader from 'components/molecules/RoomHeader';
import RelayEnvironmentContext from 'components/RelayEnvironmentContext';
import Chat from 'components/templates/Chat';
import './Room.css';

// import RoomMember from 'components/organisms/RoomMember';
// const eventViews = {
//   'm.room.message': RoomMessage,
//   'm.room.member': RoomMember,
// };

const subscription = graphql`
  subscription RoomSubscription($input: NewRoomMessageInput!) {
    newRoomMessage(input: $input) {
      edge {
        node {
          id

          content {
            body
          }
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

        messages(last: 10) @connection(key: "Room_messages") {
          edges {
            node {
              id
              content {
                body
              }
            }
          }
        }
      }
    }
  }
`;

const Room = ({ id, matrixClient }) => {
  const relayEnvironment = useContext(RelayEnvironmentContext);
  const timeline = useRef(null);

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
        onNext: res => {
          console.log(res);
          setTimeout(() => {
            timeline.current.scroll(0, 1000);
          }, 100);
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
        if (!props.viewer) {
          return <div>Viewer not found</div>;
        }

        // eslint-disable-next-line react/prop-types
        const { room } = props.viewer;

        return (
          <Chat matrixRooms={{}}>
            <div styleName="root">
              <RoomHeader />
              <div styleName="timeline" ref={timeline}>
                {room.messages.edges.map(i => (
                  <RoomMessage key={i.node.id} data={i.node} />
                ))}
              </div>
              <SendMessage styleName="send" matrixClient={matrixClient} roomId={room.id} />
            </div>
          </Chat>
        );
      }}
    />
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
