import React from 'react';
import { Icon, Button } from 'antd';
import './Search.css';

const Search = () => (
  <label styleName="root" htmlFor="search-input">
    <Icon type="search" styleName="icon" />
    <input styleName="input" id="search-input" placeholder="Поиск" />
    <Button shape="circle" icon="plus" />
  </label>
);

export default Search;
