import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { graphql } from 'react-relay';
import withQueryRenderer from 'hocs/withQueryRenderer';
import Search from 'components/Search';
import Tabs from 'components/Tabs';
import GroupCollapse from 'components/GroupCollapse';
import ModalLink from 'components/ModalLink';
import qs from 'query-string';
import './ChatSidebar.css';

const getHeader = data => <div>{data.name}</div>;

const ChatSidebar = ({ className, location, communities, viewer }) => {
  if (!communities || !viewer) {
    return null;
  }

  const query = qs.parse(location.search);
  const communityMatch = location.pathname.match(/community\/([^/]+)/);
  const openedCommunity = query.openedCommunity || (communityMatch && communityMatch[1]);

  const activeRoomMatch = location.pathname.match(/room\/([^/]+)/);
  const activeRoomId = activeRoomMatch && activeRoomMatch[1];

  const toggleCommunity = node => {
    const newQuery = {
      ...query,
      openedCommunity: node.id === openedCommunity ? undefined : node.id,
    };

    navigate(`${location.pathname}?${qs.stringify(newQuery)}`);
  };

  return (
    <div styleName="root" className={className}>
      <Search type="dark">
        <ModalLink component="button" type="button" styleName="plusButton" to="createCommunity">
          <span>+</span>
        </ModalLink>
      </Search>
      <Tabs />
      {communities.edges.map(edge => (
        <GroupCollapse
          onClick={() => toggleCommunity(edge.node)}
          opened={openedCommunity === edge.node.id}
          header={getHeader(edge.node)}
          key={edge.node.id}
          activeRoomId={activeRoomId}
          data={edge.node}
          viewer={viewer}
        />
      ))}
    </div>
  );
};

ChatSidebar.propTypes = {
  className: PropTypes.string,
  location: PropTypes.object.isRequired,
  communities: PropTypes.object,
  viewer: PropTypes.object,
};

ChatSidebar.defaultProps = {
  className: undefined,
  communities: undefined,
  viewer: undefined,
};

const query = graphql`
  query ChatSidebarQuery {
    viewer {
      ...GroupCollapse_viewer
    }

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

export default enhance(ChatSidebar);
