import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { QueryRenderer, requestSubscription, graphql } from 'react-relay';
import SendMessage from 'components/SendMessage';
import RoomMessage from 'components/organisms/RoomMessage';
import RoomMember from 'components/organisms/RoomMember';
import RoomHeader from 'components/molecules/RoomHeader';
import RelayEnvironmentContext from 'components/RelayEnvironmentContext';
import Chat from 'components/templates/Chat';
import './Room.css';

const eventViews = {
  'm.room.message': RoomMessage,
  'm.room.member': RoomMember,
};

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

const Room = ({ matrixClient, matrixRooms, id }) => {
  const relayEnvironment = useContext(RelayEnvironmentContext);
  const room = matrixClient.getRoom(id);

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
            edgeName: 'edgename',
          },
        ],
      });

      return () => sub.dispose();
    },
    [relayEnvironment, id]
  );

  if (!room) {
    return null;
  }

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
        const { room: relayRoom } = props.viewer;

        return (
          <Chat matrixRooms={matrixRooms}>
            <div styleName="root">
              <RoomHeader />
              <div styleName="timeline">
                {room.timeline.map(t => {
                  const View = eventViews[t.event.type];

                  if (!View) {
                    console.log(t.event);
                    return <div key={t.event.event_id}>Unk event: {t.event.type}</div>;
                  }

                  return <View event={t.event} key={t.event.event_id} />;
                })}
              </div>
              <SendMessage styleName="send" matrixClient={matrixClient} roomId={relayRoom.id} />
            </div>
          </Chat>
        );
      }}
    />
  );
};

Room.propTypes = {
  matrixClient: PropTypes.object.isRequired,
  matrixRooms: PropTypes.object.isRequired,
  id: PropTypes.string,
};

Room.defaultProps = {
  id: null,
};

export default Room;
