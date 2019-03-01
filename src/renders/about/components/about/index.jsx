import React from 'react';
import { remote } from 'electron';

import './index.scss';

export default class AboutComp extends React.Component {
  render () {
    const v = `&copy;Copyright echoloyuk. 2019. All rights reserved.`;
    return (
      <div className="about-panel">
        <div className="title">
          pendown.<br />
          version: {remote.app.getVersion()}</div>
        <div className="logo"></div>
        <div className="content">
          pendown是loyuk的个人开源项目，它源自作者对Electron的兴趣和学习，任何人不得用之于商业收益.
        </div>
        <div className="copy" dangerouslySetInnerHTML={{__html: v}} />
      </div>
    )
  }
}