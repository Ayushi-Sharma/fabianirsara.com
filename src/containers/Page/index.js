
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as DataActions from '../../actions/data'

class Page extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        Page
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state', state)
  return {
    data: state.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DataActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)
