import React from 'react';
import './index.scss';
import { Spin } from 'antd';

export default class Loading extends React.Component {
  render() {
    return (
      <div className="loading-container">
        <div className="loading-mask"></div>
        <div className="loading-panel">
          <Spin tip="Loading..." size="large" />
        </div>
      </div>
    )
  }
}