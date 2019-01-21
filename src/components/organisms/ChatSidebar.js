import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { graphql } from 'react-relay';
import withQueryRenderer from 'hocs/withQueryRenderer';
import Search from 'components/molecules/Search';
import Tabs from 'components/molecules/Tabs';
import GroupCollapse from 'components/molecules/GroupCollapse';
import './ChatSidebar.css';

const getHeader = data => (
  <div>
    {data.name}
    <Link to={`/community/${data.id}`}>View</Link>
  </div>
);

const Sidebar = ({ className, viewer, selectedRoom, ...props }) => {
  const { groupMembership } = viewer;

  const [opened, open] = useState(-1);

  const handleOpen = index => {
    if (index === opened) {
      return open(-1);
    }
    return open(index);
  };

  return (
    <div styleName="root" className={className} {...props}>
      <Search type="dark">
        <button type="button" styleName="plusButton">
          <span>+</span>
        </button>
      </Search>
      <Tabs />
      {groupMembership.map(({ group }, index) => (
        <GroupCollapse
          onClick={() => handleOpen(index)}
          opened={index === opened}
          header={getHeader(group)}
          key={group.id}
          selectedRoom={selectedRoom}
          group={group}
        />
      ))}
    </div>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  viewer: PropTypes.object.isRequired,
  selectedRoom: PropTypes.string.isRequired,
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
