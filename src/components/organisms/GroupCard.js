import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Icon, Button } from 'antd';
import Tag from 'components/atoms/Tag';
import './GroupCard.css';

const GroupCard = ({ title, people, desc, tags }) => (
  <div styleName="root">
    <div styleName="header">
      <div styleName="group-info">
        <Avatar size={48} icon="user" />
        <div styleName="group-data">
          <span>{title}</span>
          <div styleName="viewers">
            <Icon type="user" styleName="viewers-icon" />
            <span>{people}</span>
          </div>
        </div>
      </div>
      <Icon type="ellipsis" styleName="more-icon" />
    </div>
    <div styleName="footer">
      <span>{desc}</span>
      <div styleName="tags">
        {tags.map(t => (
          <Tag label={t} />
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
  title: PropTypes.string.isRequired,
  people: PropTypes.number.isRequired,
  desc: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
};

export default GroupCard;
