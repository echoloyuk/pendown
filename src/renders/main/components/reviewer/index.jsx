import React from 'react';

import './index.scss';

export default class Reviewer extends React.Component {
  render() {
    return (
      <div className="reviewer-comp-panel">
        <div className="title-panel">
          <div className="title">这是一个测试标题</div>
          <div>测试文件</div>
        </div>
      </div>
    )
  }
}