import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Select } from 'antd';
import { graphql } from 'react-relay';
import Search from 'components/molecules/Search';
import Tag from 'components/atoms/Tag';
import GroupCard from 'components/organisms/GroupCard';
import withQueryRenderer from 'hocs/withQueryRenderer';
import Masonry from 'react-masonry-css';
import './Catalog.css';

const { Option } = Select;

const tags = [
  {
    label: 'galaxy',
    selected: false,
  },
  {
    label: 'space',
    selected: true,
  },
  {
    label: 'nasa',
    selected: false,
  },
  {
    label: 'space',
    selected: false,
  },
  {
    label: 'discovery',
    selected: true,
  },
  {
    label: 'world',
    selected: false,
  },
  {
    label: 'млечныйпуть',
    selected: false,
  },
  {
    label: 'космос',
    selected: false,
  },
  {
    label: 'планета',
    selected: false,
  },
  {
    label: 'вселенная',
    selected: false,
  },
  {
    label: 'нло',
    selected: false,
  },
  {
    label: 'ufo',
    selected: false,
  },
  {
    label: 'наса',
    selected: false,
  },
  {
    label: 'марс',
    selected: true,
  },
  {
    label: 'космическаяпрограмма',
    selected: false,
  },
  {
    label: 'чернаядыра',
    selected: false,
  },
];

const options = [
  {
    label: 'Популярности',
    value: 'popular',
  },
  {
    label: 'Дате создания',
    value: 'date',
  },
];

const breakpointColumnsObj = {};

new Array(250).fill('').forEach((_, i) => {
  breakpointColumnsObj[531 * (i + 1)] = i + 1;
});

const Catalog = ({ communities }) => (
  <div styleName="root">
    <div styleName="header">
      <Search styleName="search" placeholder="Поиск по названию сообщества или описанию">
        <div styleName="sort">
          <span styleName="sort-title">Сортировать по:</span>
          <Select styleName="sort-select" defaultValue="popular">
            {options.map(o => (
              <Option value={o.value}>{o.label}</Option>
            ))}
          </Select>
        </div>
      </Search>
    </div>
    <div styleName="tags">
      <div styleName="tags-header">
        <div styleName="header-title">
          <Icon type="tags" styleName="title-tag" />
          <p>Выберите рубрику по интересам</p>
        </div>
        <div styleName="header-hide">
          <span>Cкрыть</span>
          <Icon type="plus" styleName="hide-icon" />
        </div>
      </div>
      <div styleName="tags-list">
        {tags.map(tag => (
          <Tag label={tag.label} selected={tag.selected} />
        ))}
      </div>
      <div styleName="tags-more">
        <span>Показать больше</span>
        <Icon type="down" styleName="more-icon" />
      </div>
    </div>
    <div styleName="groups">
      <Masonry breakpointCols={breakpointColumnsObj}>
        {communities.edges.map(e => e.node && <GroupCard key={e.node.id} data={e.node} />)}
      </Masonry>
    </div>
  </div>
);

Catalog.propTypes = {
  communities: PropTypes.array.isRequired,
};

const query = graphql`
  query CatalogQuery {
    communities(first: 20) {
      edges {
        node {
          id
          ...GroupCard
        }
      }
    }
  }
`;

const enhance = withQueryRenderer(query);

export default enhance(Catalog);
