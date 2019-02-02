import React from 'react';
import { connect } from 'react-redux';
import Logo from '../components/logo';
import * as actions from '../actions/';

class Container extends React.Component {
  render() {
    const {
      initPage,
      exampleCount
    } = this.props;
    return (
      <div>
        <Logo />
        <div onClick={() => {initPage(true)}}>HHHHH{exampleCount}</div>
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