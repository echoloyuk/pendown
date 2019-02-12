import React from 'react';
import marked from 'marked';

import './index.scss';
import './markdown.scss';

export default class Reviewer extends React.Component {
  constructor(props) {
    super(props);
  }

  getHtml(str) {
    return marked(str);
  }

  render() {
    const {
      markdownContent,
      title
    } = this.props;
    const html = this.getHtml(markdownContent);
    return (
      <div className="reviewer-comp-panel">
        <div className="title-panel">
          <div className="title">{title}</div>
        </div>
        <div className="content-panel markdown" dangerouslySetInnerHTML={{__html: html}} />
      </div>
    )
  }
}