
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import store from '../../store'
import style from './style.css'

import * as DataActions from '../../actions/data'

class App extends Component {
  render() {
    const { children, data, actions } = this.props

    if (data.pages) {
      let transitionClasses = {
        enter: style.pageEnter,
        enterActive: style.pageEnterActive,
        leave: style.pageLeave,
        leaveActive: style.pageLeaveActive,
        appear: style.pageAppear,
        appearActive: style.pageAppearActive
      }

      return (
        <div className={style.wrapper}>
          <Header poster={data.poster} content={data.header} />
          <ReactCSSTransitionGroup
            transitionName="page"
            component="div"
            transitionName={transitionClasses}
            transitionAppear={true}
            transitionAppearTimeout={1500}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
          >
            {React.cloneElement(this.props.children, {
              key: this.props.location.pathname
            })}
          </ReactCSSTransitionGroup>
          <Footer />
        </div>
      )
    } else {
      return (
        <div />
      )
    }
  }
}

function mapStateToProps(state) {
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
)(App)
