import React from 'react';
import { Icon } from 'antd';
import './index.scss';

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.onSaveHandler = this.onSaveHandler.bind(this);
    this.onReadHandler = this.onReadHandler.bind(this);
  }

  onSaveHandler() {
    const {
      onSave
    } = this.props;
    if (typeof onSave === 'function') {
      onSave();
    }
  }
  onReadHandler() {
    const {
      onRead
    } = this.props;
    if (typeof onRead === 'function') {
      onRead();
    }
  }

  render() {
    return (
      <div className="side-bar-container">
        <div className="side-bar-nav">
          <div className="item">
            <Icon type="plus-circle" />
          </div>
          <div className="item" onClick={this.onSaveHandler}>
            <Icon type="save" />
          </div>
          <div className="item" onClick={this.onReadHandler}>
            <Icon type="folder-open" />
          </div>
          <div className="item">
            <Icon type="setting" onClick={this.onTest}/>
          </div>
        </div>
      </div>
    )
  }
}