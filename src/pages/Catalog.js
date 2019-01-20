import React from 'react';
// import PropTypes from 'prop-types';
import { Icon, Select } from 'antd';
import Search from 'components/molecules/Search';
import Tag from 'components/atoms/Tag';
import GroupCard from 'components/organisms/GroupCard';
import './Catalog.css';

const { Option } = Select;

const tags = [
  {
    label: 'javscript',
    selected: false,
  },
  {
    label: 'golang',
    selected: true,
  },
  {
    label: 'github',
    selected: false,
  },
  {
    label: 'javscript',
    selected: false,
  },
  {
    label: 'golang',
    selected: true,
  },
  {
    label: 'github',
    selected: false,
  },
  {
    label: 'javscript',
    selected: false,
  },
  {
    label: 'golang',
    selected: true,
  },
  {
    label: 'github',
    selected: false,
  },
  {
    label: 'javscript',
    selected: false,
  },
  {
    label: 'golang',
    selected: true,
  },
  {
    label: 'github',
    selected: false,
  },
  {
    label: 'javscript',
    selected: false,
  },
  {
    label: 'golang',
    selected: true,
  },
  {
    label: 'github',
    selected: false,
  },
  {
    label: 'javscript',
    selected: false,
  },
  {
    label: 'golang',
    selected: true,
  },
  {
    label: 'github',
    selected: false,
  },
  {
    label: 'javscript',
    selected: false,
  },
  {
    label: 'golang',
    selected: true,
  },
  {
    label: 'github',
    selected: false,
  },
  {
    label: 'javscript',
    selected: false,
  },
  {
    label: 'golang',
    selected: true,
  },
  {
    label: 'github',
    selected: false,
  },
  {
    label: 'javscript',
    selected: false,
  },
  {
    label: 'golang',
    selected: true,
  },
  {
    label: 'github',
    selected: false,
  },
  {
    label: 'javscript',
    selected: false,
  },
  {
    label: 'golang',
    selected: true,
  },
  {
    label: 'github',
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

const groups = [
  {
    title: 'test',
    people: 150000,
    description:
      'Чилаут в англоязычном мире — метафорическое обозначение лёгкой музыки, призванной способствовать снятию психического напряжения, релаксации.',
    tags: ['123', 'gaggas', 'fdsfas'],
  },
  {
    title: 'test2',
    people: 1,
    description: 'маленькое описание',
    tags: ['1'],
  },
  {
    title: 'test',
    people: 150000,
    description:
      'Чилаут в англоязычном мире — метафорическое обозначение лёгкой музыки, призванной способствовать снятию психического напряжения, релаксации.',
    tags: ['123', 'gaggas', 'fdsfas'],
  },
  {
    title: 'test2',
    people: 1,
    description: 'маленькое описание',
    tags: ['1'],
  },
  {
    title: 'test',
    people: 150000,
    description:
      'Чилаут в англоязычном мире — метафорическое обозначение лёгкой музыки, призванной способствовать снятию психического напряжения, релаксации.',
    tags: ['123', 'gaggas', 'fdsfas'],
  },
  {
    title: 'test2',
    people: 1,
    description: 'маленькое описание',
    tags: ['1'],
  },
  {
    title: 'test',
    people: 150000,
    description:
      'Чилаут в англоязычном мире — метафорическое обозначение лёгкой музыки, призванной способствовать снятию психического напряжения, релаксации.',
    tags: ['123', 'gaggas', 'fdsfas'],
  },
  {
    title: 'test2',
    people: 1,
    description: 'маленькое описание',
    tags: ['1'],
  },
  {
    title: 'test',
    people: 150000,
    description:
      'Чилаут в англоязычном мире — метафорическое обозначение лёгкой музыки, призванной способствовать снятию психического напряжения, релаксации.',
    tags: ['123', 'gaggas', 'fdsfas'],
  },
  {
    title: 'test2',
    people: 1,
    description: 'маленькое описание',
    tags: ['1'],
  },
  {
    title: 'test',
    people: 150000,
    description:
      'Чилаут в англоязычном мире — метафорическое обозначение лёгкой музыки, призванной способствовать снятию психического напряжения, релаксации.',
    tags: ['123', 'gaggas', 'fdsfas'],
  },
  {
    title: 'test2',
    people: 1,
    description: 'маленькое описание',
    tags: ['1'],
  },
  {
    title: 'test',
    people: 150000,
    description:
      'Чилаут в англоязычном мире — метафорическое обозначение лёгкой музыки, призванной способствовать снятию психического напряжения, релаксации.',
    tags: ['123', 'gaggas', 'fdsfas'],
  },
  {
    title: 'test2',
    people: 1,
    description: 'маленькое описание',
    tags: ['1'],
  },
  {
    title: 'test',
    people: 150000,
    description:
      'Чилаут в англоязычном мире — метафорическое обозначение лёгкой музыки, призванной способствовать снятию психического напряжения, релаксации.',
    tags: ['123', 'gaggas', 'fdsfas'],
  },
  {
    title: 'test2',
    people: 1,
    description: 'маленькое описание',
    tags: ['1'],
  },
  {
    title: 'test',
    people: 150000,
    description:
      'Чилаут в англоязычном мире — метафорическое обозначение лёгкой музыки, призванной способствовать снятию психического напряжения, релаксации.',
    tags: ['123', 'gaggas', 'fdsfas'],
  },
  {
    title: 'test2',
    people: 1,
    description: 'маленькое описание',
    tags: ['1'],
  },
  {
    title: 'test',
    people: 150000,
    description:
      'Чилаут в англоязычном мире — метафорическое обозначение лёгкой музыки, призванной способствовать снятию психического напряжения, релаксации.',
    tags: ['123', 'gaggas', 'fdsfas'],
  },
  {
    title: 'test2',
    people: 1,
    description: 'маленькое описание',
    tags: ['1'],
  },
  {
    title: 'test',
    people: 150000,
    description:
      'Чилаут в англоязычном мире — метафорическое обозначение лёгкой музыки, призванной способствовать снятию психического напряжения, релаксации.',
    tags: ['123', 'gaggas', 'fdsfas'],
  },
  {
    title: 'test2',
    people: 1,
    description: 'маленькое описание',
    tags: ['1'],
  },
  {
    title: 'test',
    people: 150000,
    description:
      'Чилаут в англоязычном мире — метафорическое обозначение лёгкой музыки, призванной способствовать снятию психического напряжения, релаксации.',
    tags: ['123', 'gaggas', 'fdsfas'],
  },
  {
    title: 'test2',
    people: 1,
    description: 'маленькое описание',
    tags: ['1'],
  },
  {
    title: 'test',
    people: 150000,
    description:
      'Чилаут в англоязычном мире — метафорическое обозначение лёгкой музыки, призванной способствовать снятию психического напряжения, релаксации.',
    tags: ['123', 'gaggas', 'fdsfas'],
  },
  {
    title: 'test2',
    people: 1,
    description: 'маленькое описание',
    tags: ['1'],
  },
];

const Catalog = () => (
  <div styleName="root">
    <div styleName="header">
      <Search placeholder="Поиск по названию сообщества или описанию">
        <div styleName="sort">
          <span>Сортировать по:</span>
          <Select styleName="sort-select" defaultValue="popular">
            {options.map(o => (
              <Option value={o.value}>{o.label}</Option>
            ))}
          </Select>
        </div>
      </Search>
    </div>
    <div styleName="tags">
      <div styleName="tags__header">
        <div styleName="header__title">
          <Icon type="tags" styleName="title-tag" />
          <p>Выберите рубрику по интересам</p>
        </div>
        <div styleName="header__hide">
          <span>Cкрыть</span>
          <Icon type="plus" styleName="hide__icon" />
        </div>
      </div>
      <div styleName="tags__list">
        {tags.map(tag => (
          <Tag label={tag.label} selected={tag.selected} />
        ))}
      </div>
      <div styleName="tags__more">
        <span>Показать больше</span>
        <Icon type="down" styleName="more__icon" />
      </div>
    </div>
    <div styleName="groups">
      {groups.map(g => (
        <GroupCard title={g.title} people={g.people} desc={g.description} tags={g.tags} />
      ))}
      <div styleName="rest-groups" />
      <div styleName="rest-groups" />
      <div styleName="rest-groups" />
      <div styleName="rest-groups" />
      <div styleName="rest-groups" />
      <div styleName="rest-groups" />
      <div styleName="rest-groups" />
      <div styleName="rest-groups" />
    </div>
  </div>
);

export default Catalog;
