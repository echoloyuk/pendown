import { createAction } from 'redux-actions';
import { readFileToSpec } from '../../../service/fs';
import * as types from '../constants/ActionTypes';

const initPage = createAction(types.INIT_PAGE);

const onInputTitle = createAction(types.INPUT_TITLE);
const onInputMarkdownContent = createAction(types.INPUT_MARKDOWN_CONTENT);

const startReadFile = createAction(types.START_READ_FILE);
const finishReadFile = createAction(types.FINISH_READ_FILE);

function doReadFile(filePath) {
  return dispatch => {
    dispatch(startReadFile());
    readFileToSpec(filePath).then(res => {
      const {
        title,
        content
      } = res;
      // 获取title和正文
      dispatch(finishReadFile({
        title,
        content
      }));
    }).catch(e => {
      if (e) {
        message.error(e.toString());
      }
      dispatch(finishReadFile());
    })
  }
}

export {
  initPage,
  onInputTitle,
  onInputMarkdownContent,
  doReadFile
}