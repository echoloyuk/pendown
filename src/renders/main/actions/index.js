import { createAction } from 'redux-actions';
import { readFile, saveFile } from '../../../service/fs';
import { getTitleAndContent, getFinalContent } from '../../../service/util';
import { message } from 'antd';
import * as types from '../constants/ActionTypes';

import { ipcRenderer } from 'electron';

const initPage = createAction(types.INIT_PAGE);

const onInputTitle = createAction(types.INPUT_TITLE);
const onInputMarkdownContent = createAction(types.INPUT_MARKDOWN_CONTENT);
const startLoading = createAction(types.START_LOADING);
const finishLoading = createAction(types.FINISH_LOADING);
const finishReadFile = createAction(types.FINISH_READ_FILE);
const finishSaveFile = createAction(types.FINISH_SAVE_FILE);

function doReadFile(filePath) {
  return dispatch => {
    dispatch(startLoading());
    readFile(filePath).then(res => {
      const {
        data,
        filePath
      } = res;
      const {
        title,
        content
      } = getTitleAndContent(data);
      // 获取title和正文
      dispatch(finishReadFile({
        title,
        content,
        filePath
      }));
      dispatch(finishLoading());
    }).catch(e => {
      if (e) {
        message.error(e.toString());
      }
      dispatch(finishReadFile());
      dispatch(finishLoading());
    })
  }
}

function doSaveFile(title, content, filePath) {
  return dispatch => {
    const finalContent = getFinalContent(title, content);
    saveFile(filePath, finalContent, title).then(obj => {
      message.success('保存成功');
      dispatch(finishSaveFile({
        filePath: obj.filePath
      }));
    }).catch(e => {
      if (e) {
        message.error(e);
      }
    });
  }
}

function rendererUsed() {
  return () => {
    ipcRenderer.send('renderer_ipc', {
      type: 'have_used'
    });
  }
}

function rendererFinished() {
  return () => {
    ipcRenderer.send('renderer_ipc', {
      type: 'renderer_finish'
    });
  }
}

export {
  initPage,
  onInputTitle,
  onInputMarkdownContent,
  doReadFile,
  doSaveFile,
  rendererUsed,
  rendererFinished
}