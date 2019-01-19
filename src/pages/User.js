import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { graphql } from 'react-relay';
import withQueryRenderer from 'hocs/withQueryRenderer';

const User = ({ user }) => (
  <div>
    <h2>{user.name}</h2>
    <h3>Сообщества</h3>
    {user.ownGroups.map(g => (
      <div key={g.name}>
        <h5>{g.name}</h5>
        <Button type="primary">Подписаться</Button>
      </div>
    ))}
  </div>
);

User.propTypes = {
  user: PropTypes.object.isRequired,
};

const query = graphql`
  query UserQuery($id: ID!) {
    user(id: $id) {
      name

      ownGroups {
        name
      }
    }
  }
`;

const enhance = withQueryRenderer(query, {
  getVariables: props => ({
    id: props.name,
  }),
});

export default enhance(User);
