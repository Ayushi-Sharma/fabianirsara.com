
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import GoogleAnalytics from 'react-g-analytics'

import Header from '../../components/Header'

import config from '../../config'
import store from '../../store'
import style from './style.css'
import transition from './transition.css'
import getPageContent from '../../utils/getPageContent'

import * as DataActions from '../../actions/data'

import getConfig from '../../utils/getConfig'
import getStyle, { restyle } from '../../utils/getStyle'

class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      document.body.classList.add('ready')
    }, 170)
  }

  componentWillReceiveProps(nextProps) {
    const { children, data, actions } = this.props

    setTimeout(() => {
      actions.cachePage(this.props.location.pathname)
    }, 1000)
  }

  render() {
    const { children, data, actions } = this.props

    if (data.pages) {
      const globalConfig = getConfig()
      getStyle()
      restyle()

      let transitionClasses = {
        enter: transition.pageEnter,
        enterActive: transition.pageEnterActive,
        leave: transition.pageLeave,
        leaveActive: transition.pageLeaveActive,
        appear: transition.pageAppear,
        appearActive: transition.pageAppearActive
      }

      const pageData = getPageContent(this.props.location.pathname)

      if (pageData.config.inverse) {
        document.body.classList.add('inverse')
      } else {
        document.body.classList.remove('inverse')
      }

      let analytics = (config.env === 'production' && globalConfig.analytics)
        ? (<GoogleAnalytics id={globalConfig.analytics} />)
        : null

      return (
        <div className={style.wrapper}>
          {analytics}
          <div className={classnames(style.line, style.left)} />
          <div className={classnames(style.line, style.top)} />
          <div className={classnames(style.line, style.right)} />
          <div className={classnames(style.line, style.bottom)} />

          <Header location={this.props.location} />
          <ReactCSSTransitionGroup
            transitionName="page"
            component="div"
            transitionName={transitionClasses}
            transitionAppear={true}
            transitionAppearTimeout={800}
            transitionEnterTimeout={650}
            transitionLeaveTimeout={350}
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
