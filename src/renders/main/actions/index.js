import { createAction } from 'redux-actions';
import { readFile, saveFile } from '../../../service/fs';
import { getTitleAndContent, getFinalContent } from '../../../service/util';
import { message } from 'antd';
import * as types from '../constants/ActionTypes';

const initPage = createAction(types.INIT_PAGE);

const onInputTitle = createAction(types.INPUT_TITLE);
const onInputMarkdownContent = createAction(types.INPUT_MARKDOWN_CONTENT);

const startLoading = createAction(types.START_LOADING);
const finishLoading = createAction(types.FINISH_LOADING);

const finishReadFile = createAction(types.FINISH_READ_FILE);

function doReadFile(filePath) {
  return dispatch => {
    dispatch(startLoading());
    readFile(filePath).then(res => {
      const {
        data
      } = res;
      const {
        title,
        content
      } = getTitleAndContent(data);
      // 获取title和正文
      dispatch(finishReadFile({
        title,
        content
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
    dispatch(startLoading());
    const finalContent = getFinalContent(title, content);
    saveFile(filePath, finalContent).then(() => {
      message.success('保存成功');
      dispatch(finishLoading());
    }).catch(e => {
      if (e) {
        message.error(e);
      }
      dispatch(finishLoading());
    });
  }
}

export {
  initPage,
  onInputTitle,
  onInputMarkdownContent,
  doReadFile,
  doSaveFile
}