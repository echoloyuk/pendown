import React from 'react';
import AceEditor from 'react-ace';
import './index.scss';

import 'brace/mode/markdown';
import 'brace/theme/github';
export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeContentHandler = this.onChangeContentHandler.bind(this);
  }
  onChangeContentHandler(val) {
    const {
      onInputMarkdownContent
    } = this.props;
    onInputMarkdownContent(val);
  }
  render() {
    const {
      markdownContent
    } = this.props;
    return (
      <div className="editor-component-container">
        <AceEditor
          mode="markdown"
          width="100%"
          height="100%"
          theme="github"
          fontSize={14}
          wrapEnabled={true}
          highlightActiveLine={false}
          showPrintMargin={false}
          tabSize={2}
          showGutter={false}
          value={markdownContent}
          onChange={this.onChangeContentHandler}
          style={{
            minHeight: 100,
            backgroundColor: 'transparent'
          }} />
      </div>
    )
  }
}