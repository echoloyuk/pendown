import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const middleware = [thunkMiddleware];

  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    middleware.push(createLogger());
  }

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store
}