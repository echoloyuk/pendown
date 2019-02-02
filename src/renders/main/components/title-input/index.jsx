import React from 'react';

import './index.scss';

export default class TitleInput extends React.Component {
  render() {
    return (
      <div className="title-input-panel">
        <input type="text" className="title-input" placeholder="请输入标题" />
      </div>
    )
  }
}