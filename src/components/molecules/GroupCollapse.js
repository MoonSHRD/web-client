import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Icon, Button } from 'antd';
import { Link } from '@reach/router';
import ModalLink from 'components/atoms/ModalLink';
import Room from 'components/atoms/Room';
import './GroupCollapse.css';

const GroupCollapse = ({ opened, header, group, selectedRoom, onClick }) => (
  <div styleName="root">
    {/* eslint-disable-next-line */}
    <div onClick={onClick} role="button" styleName={`header ${opened ? 'opened' : ''}`}>
      <div styleName="headerLeft">
        <Avatar size={48} icon="user" src={group.avatarUrl} />
        <div styleName="info">
          <span styleName="groupName">{header}</span>
          <span styleName="groupDesc">
            <Link to={`/group/${group.id}/settings`} style={{ color: '#aaa' }}>
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
          {group.rooms.map(room => (
            <Room room={room} key={room.id} selectedRoom={selectedRoom} />
          ))}
        </div>
        {group.rooms.length === 0 && <div>Rooms not found</div>}
        <ModalLink component={Button} to="createRoom" params={{ groupId: group.id }} size="small">
          Create Room
        </ModalLink>
      </Fragment>
    )}
  </div>
);

GroupCollapse.propTypes = {
  opened: PropTypes.bool,
  header: PropTypes.any,
  selectedRoom: PropTypes.string.isRequired,
  group: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

GroupCollapse.defaultProps = {
  opened: true,
  header: undefined,
};

export default GroupCollapse;
