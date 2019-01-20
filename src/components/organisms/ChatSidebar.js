import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Button, Collapse } from 'antd';
import { graphql } from 'react-relay';
import Search from 'components/molecules/Search';
import ModalLink from 'components/atoms/ModalLink';
import withQueryRenderer from 'hocs/withQueryRenderer';
import './ChatSidebar.css';

const getHeader = data => (
  <div>
    {data.name}
    <Link to={`/community/${data.id}`}>View</Link>
  </div>
);

const Sidebar = ({ className, viewer, ...props }) => {
  const { groupMembership } = viewer;

  return (
    <div styleName="root" className={className} {...props}>
      <Search type="dark">
        <Button shape="circle" icon="plus" />
      </Search>
      <Collapse defaultActiveKey={groupMembership.map(gm => gm.group.id)} key={groupMembership.length}>
        {groupMembership.map(({ group }) => (
          <Collapse.Panel header={getHeader(group)} key={group.id}>
            {group.rooms.map(room => (
              <div key={room.id}>
                <Link to={`/room/${room.id}`}>{room.name}</Link>
              </div>
            ))}
            {group.rooms.length === 0 && <div>Rooms not found</div>}
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
  className: PropTypes.string,
  viewer: PropTypes.object.isRequired,
};

Sidebar.defaultProps = {
  className: undefined,
};

const query = graphql`
  query ChatSidebarQuery {
    viewer {
      groupMembership {
        group {
          id
          name

          rooms {
            id
            name
          }
        }
      }
    }
  }
`;

const enhance = withQueryRenderer(query);

export default enhance(Sidebar);
