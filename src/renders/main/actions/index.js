import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';

const initPage = createAction(types.INIT_PAGE);

const onInputTitle = createAction(types.INPUT_TITLE);
const onInputMarkdownContent = createAction(types.INPUT_MARKDOWN_CONTENT);

export {
  initPage,
  onInputTitle,
  onInputMarkdownContent
}