import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import Container from './container/index';
import './index.scss';

import "antd/dist/antd.css";

const store = configureStore({});

ReactDom.render((
  <Provider store={store}>
    <Container />
  </Provider>
), document.getElementById('app'));

