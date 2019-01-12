import React from 'react';
import PropTypes from 'prop-types';
import { graphql, createFragmentContainer } from 'react-relay';
import RoomMessage from 'components/organisms/RoomMessage';
import './RoomTimeline.css';

const RoomTimeline = ({ messageEdges }) => (
  <div styleName="timeline">
    {messageEdges.map(i => (
      <RoomMessage key={i.node.id} data={i.node} />
    ))}
  </div>
);

RoomTimeline.propTypes = {
  messageEdges: PropTypes.array.isRequired,
};

export default createFragmentContainer(
  RoomTimeline,
  graphql`
    fragment RoomTimeline_messageEdges on RoomMessageEdge @relay(plural: true) {
      node {
        id
        ...RoomMessage
      }
    }
  `
);
