import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as types from '../constants/ActionTypes';

const initStates = {
  buttonText: '点击+1',
  exampleCount: 0,
  title: '', // 标题
  markdownContent: '', // markdown原文
  loading: false, // 全屏阻塞加载
  haveUsed: false, // 当前是否被使用
  pendownTitle: 'pendown', // pendown软件的title框
  oTitle: '', // 原始的文章标题
  oMarkdownContent: '', // 原始的文章markdown正文
  filePath: null,
  isChanged: false // 当前文件是否有变动
}

const reducer = handleActions({
  [types.INPUT_TITLE] (state, action) {
    const val = action.payload;
    let isChanged = true;
    if (state.oTitle === val && state.oMarkdownContent === state.markdownContent) {
      isChanged = false;
    }
    return {
      ...state,
      title: val,
      haveUsed: true,
      isChanged
    }
  },
  [types.INPUT_MARKDOWN_CONTENT] (state, action) {
    const val = action.payload;
    let isChanged = true;
    if (state.oMarkdownContent === val && state.oTitle === state.title) {
      isChanged = false;
    }
    return {
      ...state,
      markdownContent: val,
      haveUsed: true,
      isChanged
    }
  },
  [types.START_LOADING](state) {
    return {
      ...state,
      loading: true
    }
  },
  [types.FINISH_LOADING](state) {
    return {
      ...state,
      loading: false
    }
  },
  [types.FINISH_READ_FILE](state, action) {
    if (!action.payload) {
      return {
        ...state
      }
    }
    const {
      title,
      content,
      filePath
    } = action.payload;
    return {
      ...state,
      title,
      filePath,
      pendownTitle: filePath,
      markdownContent: content,
      oTitle: title,
      oMarkdownContent: content,
      haveUsed: true,
      isChanged: false
    }
  },
  [types.FINISH_SAVE_FILE](state, action) {
    const {
      filePath
    } = action.payload;
    return {
      ...state,
      filePath,
      oTitle: state.title,
      oMarkdownContent: state.markdownContent,
      pendownTitle: filePath,
      isChanged: false
    }
  }
}, initStates);


export default combineReducers({
  reducer
})