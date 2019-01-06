import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Button, Collapse } from 'antd';
import './Sidebar.css';

const Sidebar = ({ className, rooms, ...props }) => (
  <div styleName="root" className={className} {...props}>
    <Button>Create Community</Button>
    <Collapse defaultActiveKey={['1']}>
      <Collapse.Panel header="Space science community" key="1">
        {Object.keys(rooms).map(id => (
          <div key={id}>
            <Link to={`/room/${id}`}>{rooms[id].name}</Link>
          </div>
        ))}
        <Button size="small">Create Chat</Button>
      </Collapse.Panel>
      <Collapse.Panel header="City wolves" key="2">
        <p>none</p>
      </Collapse.Panel>
      <Collapse.Panel header="Chill" key="3">
        <p>none</p>
      </Collapse.Panel>
      <Collapse.Panel header="Travels" key="4">
        <p>none</p>
      </Collapse.Panel>
      <Collapse.Panel header="Coffee mania" key="5">
        <p>none</p>
      </Collapse.Panel>
      <Collapse.Panel header="Love in forest" key="6">
        <p>none</p>
      </Collapse.Panel>
    </Collapse>
  </div>
);

Sidebar.propTypes = {
  rooms: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Sidebar.defaultProps = {
  className: undefined,
};

export default Sidebar;
