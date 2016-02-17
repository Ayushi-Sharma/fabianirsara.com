
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Header from '../../components/Header'

import store from '../../store'
import style from './style.css'
import transition from './transition.css'

import * as DataActions from '../../actions/data'

import getConfig from '../../utils/getConfig'
import getStyle, { restyle } from '../../utils/getStyle'

class App extends Component {
  render() {
    const { children, data, actions } = this.props

    if (data.pages) {
      getStyle()
      getConfig()
      restyle()

      let transitionClasses = {
        enter: transition.pageEnter,
        enterActive: transition.pageEnterActive,
        leave: transition.pageLeave,
        leaveActive: transition.pageLeaveActive,
        appear: transition.pageAppear,
        appearActive: transition.pageAppearActive
      }

      return (
        <div className={style.wrapper}>
          <div className={classnames(style.line, style.left)} />
          <div className={classnames(style.line, style.top)} />
          <div className={classnames(style.line, style.right)} />
          <div className={classnames(style.line, style.bottom)} />

          <Header />
          <ReactCSSTransitionGroup
            transitionName="page"
            component="div"
            transitionName={transitionClasses}
            transitionAppear={true}
            transitionAppearTimeout={1500}
            transitionEnterTimeout={1300}
            transitionLeaveTimeout={700}
          >
            {React.cloneElement(this.props.children, {
              key: this.props.location.pathname
            })}
          </ReactCSSTransitionGroup>
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
