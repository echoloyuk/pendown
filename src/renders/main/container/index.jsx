import React from 'react';
import { connect } from 'react-redux';
import SideBar from '../components/sidebar';
import TitleInput from '../components/title-input';
import Editor from '../components/editor';
import Reviewer from '../components/reviewer';
import Loading from '../components/loading';
import * as actions from '../actions/';
import OP from '../constants/op';
import { getOP } from '../util/op';
import { setTitle } from '../api/others';

import { ipcRenderer } from 'electron';

import './index.scss';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  doSave() {
    const {
      doSaveFile,
      title,
      markdownContent,
      filePath
    } = this.props;
    doSaveFile(title, markdownContent, filePath);
  }

  doRead(filePath) {
    const {
      doReadFile
    } = this.props;
    doReadFile(filePath);
  }
  
  shouldComponentUpdate(nextProps) {
    const {
      pendownTitle,
      rendererUsed,
      haveUsed,
      isChanged,
      rendererChanged
    } = nextProps;

    console.log('isChanged', isChanged);

    if (this.props.isChanged !== isChanged) {
      if (!isChanged) {
        setTitle(pendownTitle);
        rendererChanged(false);
      } else {
        setTitle('* ' + pendownTitle);
        rendererChanged(true);
      }
    }

    if (haveUsed && !this.props.haveUsed) {
      rendererUsed();
    }

    return true;
  }

  componentDidMount() {
    const {
      pendownTitle,
      doReadFile,
      rendererFinished
    } = this.props;
    setTitle(pendownTitle);
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

    // 当从主进程中收到了打开文件的推送消息时，弹出窗口
    ipcRenderer.on('OPEN_FILE', (e, p) => {
      doReadFile(p);
    });
    // 当container完成加载之后，需要通知主进程，如果主进程中有事件需要通知渲染进程，则通知主进程可以通知了
    ipcRenderer.send('RENDERER_FINISH', true);


    // 新架构
    rendererFinished();
  }

  render() {
    const {
      loading
    } = this.props;
    return (
      <div className="main-container">
        <SideBar
          onSave={() => {this.doSave()}}
          onRead={() => {this.doRead()}} />
        <div className="editor-container">
          <div className="editor-panel">
            <TitleInput {...this.props} />
            <Editor {...this.props} />
          </div>
          <div className="review-panel">
            <Reviewer {...this.props} />
          </div>
        </div>
        <Loading show={loading} />
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