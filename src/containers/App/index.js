
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from '../../components/Header'
import MainSection from '../../components/MainSection'
import Footer from '../../components/Footer'
import style from './style.css'

import * as DataActions from '../../actions/data'
import jsyaml from 'js-yaml'

class App extends Component {
  state = {
    poster: null
  };

  render() {
    const { children, data } = this.props

    if (data.pages) {
      let folder = data.pages.home
      let path = this.props.location.pathname.substring(1)

      if (path.substring(path.length - 1) === '/') path = path.substring(0, path.length - 1)
      if (path.length > 0 && data.pages[path] && data.pages[path]['index.md']) {
        folder = data.pages[path]
      }

      let poster = null
      let content = null
      let header = null
      if (folder['poster.jpg']) poster = folder['poster.jpg'].localFile
      if (folder['poster.png']) poster = folder['poster.png'].localFile

      if (folder['index.md']) content = folder['index.md'].content
      if (folder['header.yaml']) header = jsyaml.load(folder['header.yaml'].content)
      if (folder['header.json']) header = JSON.parse(folder['header.json'].content)

      return (
        <div className={style.wrapper}>
          <Header poster={poster} content={header} />
          <MainSection content={content}>
            {children}
          </MainSection>
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
