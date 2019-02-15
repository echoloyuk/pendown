import React from 'react';
import { connect } from 'react-redux';
import SideBar from '../components/sidebar';
import TitleInput from '../components/title-input';
import Editor from '../components/editor';
import Reviewer from '../components/reviewer';
import Loading from '../components/loading';
import { message } from 'antd';
import * as actions from '../actions/';

import { saveFile, readFile } from '../../../service/fs';
import OP from '../constants/op';
import { getOP } from '../util/op';
import { setTitle } from '../api/others';

import './index.scss';

let isChangePendownTitle = false;

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

  doRead() {
    readFile().then(data => {
      console.log(data);
    }).catch(e => {
      if (e) {
        message.error(e.toString());
      }
    })
  }
  
  shouldComponentUpdate(nextProps) {
    const {
      oTitle,
      oMarkdownContent,
      title,
      markdownContent,
      pendownTitle
    } = nextProps;
    if (oTitle === title && oMarkdownContent === markdownContent) {
      setTitle(pendownTitle);
    } else {
      setTitle('* ' + pendownTitle);
    }
    return true;
  }

  componentDidMount() {
    const {
      pendownTitle
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
  }

  render() {
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
        <Loading />
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