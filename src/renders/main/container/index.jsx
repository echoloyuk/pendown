import React from 'react';
import { connect } from 'react-redux';
import SideBar from '../components/sidebar';
import TitleInput from '../components/title-input';
import Editor from '../components/editor';
import Reviewer from '../components/reviewer';
import * as actions from '../actions/';

import './index.scss';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="main-container">
        <SideBar />
        <div className="editor-container">
          <div className="editor-panel">
            <TitleInput />
            <Editor />
          </div>
          <div className="review-panel">
            <Reviewer />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state.reducer:', state.reducer);
  return {
    ...state.reducer
  };
}

export default connect(
  mapStateToProps,
  {...actions}
)(Container)