import React from 'react';
import { Icon } from 'antd';
import './index.scss';

export default class SideBar extends React.Component {
  render() {
    return (
      <div className="side-bar-container">
        <div className="side-bar-nav">
          <div className="item">
            <Icon type="plus-circle" />
          </div>
          <div className="item">
            <Icon type="save" />
          </div>
          <div className="item">
            <Icon type="folder-open" />
          </div>
          <div className="item">
            <Icon type="setting" />
          </div>
        </div>
      </div>
    )
  }
}