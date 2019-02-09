import React, { Fragment } from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import PropTypes from 'prop-types';
import { Avatar, Icon } from 'antd';
import { Link } from '@reach/router';
import ModalLink from 'components/ModalLink';
import IconItem from 'components/IconItem';
import qs from 'query-string';
import './GroupCollapse.css';

const GroupCollapse = ({ opened, header, data, activeRoomId, onClick, viewer }) => {
  const isOwner = viewer.ownCommunityIds.includes(data.id);

  return (
    <div styleName="root">
      {/* eslint-disable-next-line */}
      <div onClick={onClick} role="button" styleName={`header ${opened ? 'opened' : ''}`}>
        <div styleName="headerLeft">
          <Avatar size={48} icon="user" src={data.avatarUrl} />
          <div styleName="info">
            <span styleName="groupName">{header}</span>
            <span styleName="groupDesc">{data.description || 'TODO: Добавить описание'}</span>
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
            {isOwner && (
              <React.Fragment>
                <ModalLink component={IconItem} icon="plus" to="createRoom" params={{ communityId: data.id }}>
                  Создать чат
                </ModalLink>
                <IconItem component={Link} icon="setting" to={`/community/${data.id}`}>
                  Настройки
                </IconItem>
              </React.Fragment>
            )}
            {data.rooms.edges.map(
              roomEdge =>
                roomEdge.node && (
                  <IconItem
                    component={Link}
                    icon="message"
                    key={roomEdge.node.id}
                    active={roomEdge.node.id === activeRoomId}
                    to={`/room/${roomEdge.node.id}?${qs.stringify({ openedCommunity: data.id })}`}
                  >
                    {roomEdge.node.name}
                  </IconItem>
                )
            )}
          </div>
          {data.rooms.edges.length === 0 && <div>Rooms not found</div>}
        </Fragment>
      )}
    </div>
  );
};

GroupCollapse.propTypes = {
  opened: PropTypes.bool,
  header: PropTypes.any,
  activeRoomId: PropTypes.string,
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  viewer: PropTypes.object.isRequired,
};

GroupCollapse.defaultProps = {
  opened: true,
  activeRoomId: undefined,
  header: undefined,
};

export default createFragmentContainer(
  GroupCollapse,
  graphql`
    fragment GroupCollapse_viewer on Viewer {
      id
      ownCommunityIds
    }

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
