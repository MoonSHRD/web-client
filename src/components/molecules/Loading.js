import React from 'react';
import { Spin } from 'antd';
import './Loading.css';

const Loading = () => (
  <div styleName="root">
    <Spin size="large" />
  </div>
);

export default Loading;
