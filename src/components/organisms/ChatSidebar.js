import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { graphql } from 'react-relay';
import withQueryRenderer from 'hocs/withQueryRenderer';
import Search from 'components/molecules/Search';
import Tabs from 'components/molecules/Tabs';
import GroupCollapse from 'components/molecules/GroupCollapse';
import ModalLink from 'components/atoms/ModalLink';
import './ChatSidebar.css';

const getHeader = data => (
  <div>
    {data.name}
    <Link to={`/community/${data.rowId}`}>View</Link>
  </div>
);

const Sidebar = ({ className, communities, selectedRoom, ...props }) => {
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
        <ModalLink component="button" type="button" styleName="plusButton" to="createCommunity">
          <span>+</span>
        </ModalLink>
      </Search>
      <Tabs />
      {communities.edges.map((edge, index) => (
        <GroupCollapse
          onClick={() => handleOpen(index)}
          opened={index === opened}
          header={getHeader(edge.node)}
          key={edge.node.id}
          selectedRoom={selectedRoom}
          data={edge.node}
        />
      ))}
    </div>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  selectedRoom: PropTypes.string.isRequired,
  communities: PropTypes.object.isRequired,
};

Sidebar.defaultProps = {
  className: undefined,
};

const query = graphql`
  query ChatSidebarQuery {
    communities {
      edges {
        node {
          id
          rowId
          name
          ...GroupCollapse
        }
      }
    }
  }
`;

const enhance = withQueryRenderer(query);

export default enhance(Sidebar);
