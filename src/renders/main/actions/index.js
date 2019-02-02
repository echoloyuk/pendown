import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';

const initPage = createAction(types.INIT_PAGE);

export {
  initPage
}