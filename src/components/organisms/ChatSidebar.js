import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Button, Collapse } from 'antd';
import { useJoinedGroups } from 'components/hooks';
import Search from 'components/molecules/Search';
import ModalLink from 'components/atoms/ModalLink';
import './ChatSidebar.css';

const getHeader = data => {
  if (!data.profile) {
    return '???';
  }

  return (
    <div>
      {data.profile.name}
      <Link to={`/community/${data.id}`}>View</Link>
    </div>
  );
};

const Sidebar = ({ className, rooms, ...props }) => {
  const joinedGroups = useJoinedGroups();

  return (
    <div styleName="root" className={className} {...props}>
      <Search />
      <Collapse defaultActiveKey={joinedGroups.map(g => g.id)} key={joinedGroups.length}>
        {joinedGroups.map(group => (
          <Collapse.Panel header={getHeader(group)} key={group.id}>
            {group.rooms &&
              group.rooms.chunk.map(room => (
                <div key={room.room_id}>
                  <Link to={`/room/${room.room_id}`}>{room.name}</Link>
                </div>
              ))}
            {(!group.rooms || group.rooms.chunk.length === 0) && <div>Rooms not found</div>}
            <ModalLink component={Button} to="createRoom" params={{ groupId: group.id }} size="small">
              Create Room
            </ModalLink>
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  );
};

Sidebar.propTypes = {
  rooms: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Sidebar.defaultProps = {
  className: undefined,
};

export default Sidebar;
