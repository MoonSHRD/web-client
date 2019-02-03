import React from 'react';
import PropTypes from 'prop-types';
import { Location, navigate } from '@reach/router';
import { graphql } from 'react-relay';
import withQueryRenderer from 'hocs/withQueryRenderer';
import Search from 'components/molecules/Search';
import Tabs from 'components/molecules/Tabs';
import GroupCollapse from 'components/molecules/GroupCollapse';
import ModalLink from 'components/atoms/ModalLink';
import qs from 'query-string';
import './ChatSidebar.css';

const getHeader = data => <div>{data.name}</div>;

const Sidebar = ({ className, communities, ...props }) => (
  <Location>
    {({ location }) => {
      if (!communities) {
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
        <div styleName="root" className={className} {...props}>
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
            />
          ))}
        </div>
      );
    }}
  </Location>
);

Sidebar.propTypes = {
  className: PropTypes.string,
  communities: PropTypes.object,
};

Sidebar.defaultProps = {
  className: undefined,
  communities: undefined,
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
