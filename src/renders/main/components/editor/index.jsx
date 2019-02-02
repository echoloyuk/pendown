import React from 'react';
import ReactMarkdown from 'react-markdown';
import './index.scss';

export default class Editor extends React.Component {
  render() {
    return (
      <div className="editor-panel">
        <ReactMarkdown />
      </div>
    )
  }
}