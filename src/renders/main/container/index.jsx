import React from 'react';
import { connect } from 'react-redux';
import SideBar from '../components/sidebar';
import TitleInput from '../components/title-input';
import Editor from '../components/editor';
import Reviewer from '../components/reviewer';
import { message } from 'antd';
import * as actions from '../actions/';

import { saveFile } from '../../../service/fs';
import OP from '../constants/op';
import { getOP } from '../util/op';

import './index.scss';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  doSave() {
    const {
      title,
      markdownContent
    } = this.props;
    saveFile(null, `# ${title} \r\n\r\n` + markdownContent).then(() => {
      message.success('保存成功');
    }).catch(e => {
      if (e) {
        message.error(e);
      }
    });
  }
  
  componentDidMount() {
    // 绑定save事件
    document.addEventListener('keydown', (e) => {
      const {
        keyCode,
        metaKey
      } = e;
      const op = getOP(metaKey, keyCode);
      switch (op) {
        case OP.SAVE: // 保存
          this.doSave();
          break;
        default:
          break;
      }
    });
  }

  render() {
    return (
      <div className="main-container">
        <SideBar />
        <div className="editor-container">
          <div className="editor-panel">
            <TitleInput {...this.props} />
            <Editor {...this.props} />
          </div>
          <div className="review-panel">
            <Reviewer {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state.reducer:', state.reducer);
  return {
    ...state.reducer
  };
}

export default connect(
  mapStateToProps,
  {...actions}
)(Container)