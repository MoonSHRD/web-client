import React, { Fragment } from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import PropTypes from 'prop-types';
import { Avatar, Icon, Button } from 'antd';
import { Link } from '@reach/router';
import ModalLink from 'components/atoms/ModalLink';
import Room from 'components/atoms/Room';
import './GroupCollapse.css';

const GroupCollapse = ({ opened, header, data, activeRoomId, onClick }) => (
  <div styleName="root">
    {/* eslint-disable-next-line */}
    <div onClick={onClick} role="button" styleName={`header ${opened ? 'opened' : ''}`}>
      <div styleName="headerLeft">
        <Avatar size={48} icon="user" src={data.avatarUrl} />
        <div styleName="info">
          <span styleName="groupName">{header}</span>
          <span styleName="groupDesc">
            <Link to={`/community/${data.rowId}/settings`} style={{ color: '#aaa' }}>
              Настройки
            </Link>
          </span>
        </div>
      </div>
      <div styleName="headerRight">
        <Icon type="info-circle" />
        <Icon type={opened ? 'up' : 'down'} />
      </div>
    </div>
    {opened && (
      <Fragment>
        <div styleName="rooms">
          {data.rooms.edges.map(
            roomEdge =>
              roomEdge.node && (
                <Room
                  room={roomEdge.node}
                  key={roomEdge.node.id}
                  active={roomEdge.node.id === activeRoomId}
                  communityId={data.id}
                />
              )
          )}
        </div>
        {data.rooms.edges.length === 0 && <div>Rooms not found</div>}
        <ModalLink component={Button} to="createRoom" params={{ communityId: data.id }} size="small">
          Create Room
        </ModalLink>
      </Fragment>
    )}
  </div>
);

GroupCollapse.propTypes = {
  opened: PropTypes.bool,
  header: PropTypes.any,
  activeRoomId: PropTypes.string,
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

GroupCollapse.defaultProps = {
  opened: true,
  activeRoomId: undefined,
  header: undefined,
};

export default createFragmentContainer(
  GroupCollapse,
  graphql`
    fragment GroupCollapse on Community {
      id
      rowId
      avatarUrl
      name

      rooms(first: 99) @connection(key: "GroupCollapse_rooms") {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `
);
