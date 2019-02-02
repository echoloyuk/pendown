import React from 'react';
import { connect } from 'react-redux';
import Logo from '../components/logo';
import { getCurrentFiles } from '../api/fs';
import * as actions from '../actions/';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  clickHandler() {
    const str = getCurrentFiles();
    alert(str);
  }

  render() {
    const {
      initPage,
      exampleCount
    } = this.props;
    return (
      <div>
        <Logo />
        <div onClick={() => {initPage(true)}}>HHHHH{exampleCount}</div>
        <div className="button" onClick={this.clickHandler}>test</div>
        <div>{__dirname}</div>
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