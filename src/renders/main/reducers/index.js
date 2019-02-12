import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as types from '../constants/ActionTypes';

const initStates = {
  buttonText: '点击+1',
  exampleCount: 0,

  title: '', // 标题
  markdownContent: '', // markdown原文
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
  }
}, initStates);


export default combineReducers({
  reducer
})