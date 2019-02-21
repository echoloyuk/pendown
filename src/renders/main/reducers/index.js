import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as types from '../constants/ActionTypes';

const initStates = {
  buttonText: '点击+1',
  exampleCount: 0,

  title: '', // 标题
  markdownContent: '', // markdown原文
  loading: false, // 全屏阻塞加载
  
  pendownTitle: 'pendown', // pendown软件的title框
  oTitle: '', // 原始的文章标题
  oMarkdownContent: '', // 原始的文章markdown正文
  filePath: null,
}

const reducer = handleActions({
  [types.INIT_PAGE] (state, action) {
    if (action.payload) {
      return {
        ...state,
        exampleCount: ++state.exampleCount
      }
    } else {
      return {
        ...state
      }
    }
  },
  [types.INPUT_TITLE] (state, action) {
    const val = action.payload;
    return {
      ...state,
      title: val
    }
  },
  [types.INPUT_MARKDOWN_CONTENT] (state, action) {
    const val = action.payload;
    return {
      ...state,
      markdownContent: val
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
  [types.SYNC_TITLE_AND_CONTENT](state) {
    return {
      ...state,
      oTitle: state.title,
      oMarkdownContent: state.markdownContent
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
      oMarkdownContent: content
    }
  }
}, initStates);


export default combineReducers({
  reducer
})