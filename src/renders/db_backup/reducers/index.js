import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as types from '../constants/ActionTypes';

const initStates = {
  buttonText: '点击+1',
  exampleCount: 0
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
  }
}, initStates);


export default combineReducers({
  reducer
})