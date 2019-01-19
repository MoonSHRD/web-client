import React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'react-relay';
import withQueryRenderer from 'hocs/withQueryRenderer';

const CommunitiesList = ({ groups }) => <div>{JSON.stringify(groups)}</div>;

CommunitiesList.propTypes = {
  groups: PropTypes.object.isRequired,
};

const query = graphql`
  query CommunitiesListQuery {
    groups {
      id
      name
      avatarUrl
      shortDescription
    }
  }
`;

const enhance = withQueryRenderer(query);

export default enhance(CommunitiesList);
