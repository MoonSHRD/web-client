import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import { Avatar, Icon, Button } from 'antd';
import Tag from 'components/Tag';
import './GroupCard.css';

const GroupCard = ({ data }) => (
  <div styleName="root">
    <div styleName="header">
      <div styleName="group-info">
        <Avatar size={48} icon="user" />
        <div styleName="group-data">
          <span styleName="title">{data.name}</span>
          <div styleName="viewers">
            <Icon type="user" styleName="viewer-icon" />
            <span>{data.userCount}</span>
          </div>
        </div>
      </div>
      <Icon type="ellipsis" styleName="more-icon" />
    </div>
    <div styleName="footer">
      <span>{data.shortDescription}</span>
      <div styleName="tags">
        {data.tags.map(t => (
          <Tag key={t} label={t} />
        ))}
      </div>
      <div styleName="buttons">
        <Button styleName="button" type="primary">
          Вступить в сообщество
        </Button>
        <Button styleName="button">Офферы</Button>
      </div>
    </div>
  </div>
);

GroupCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default createFragmentContainer(
  GroupCard,
  graphql`
    fragment GroupCard on Community {
      name
      tags
      userCount
      shortDescription
    }
  `
);
