import React from 'react';

import './index.scss';

export default class TitleInput extends React.Component {
  constructor(props) {
    super(props);

    this.changeInputHandler = this.changeInputHandler.bind(this);
  }

  changeInputHandler(e) {
    const val = e.currentTarget.value;
    const {
      onInputTitle
    } = this.props;
    onInputTitle(val);
  }

  render() {
    const {
      title
    } = this.props;
    return (
      <div className="title-input-panel">
        <input type="text" className="title-input" placeholder="请输入标题" value={title} onChange={this.changeInputHandler} />
      </div>
    )
  }
}