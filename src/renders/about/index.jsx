import React from 'react';
import ReactDom from 'react-dom';
import AboutComp from './components/about';
import './index.scss';

import "antd/dist/antd.css";

ReactDom.render((
  <main>
    <AboutComp />
  </main>
), document.getElementById('app'));