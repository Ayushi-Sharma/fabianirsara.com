
import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'

import MainSection from '../../components/MainSection'
import Poster from '../../components/Poster'
import Footer from '../../components/Footer'

import markdown from '../../utils/markdown'
import getPageContent from '../../utils/getPageContent'
import style from './style.css'
import grid from '../../assets/css/grid.css'
import scrollTo from '../../utils/scrollTo'
import setSiteTitle from '../../utils/setSiteTitle'

import List from '../List'
import Text from '../Text'

class Page extends Component {
  componentDidMount() {
    setSiteTitle(this.data)

    scrollTo(0, 0.75)
    window.addEventListener('resize', (this._handleResize = ::this.handleResize))
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize)
  }

  handleResize() {
    this.refs.node.parentNode.style.height = this.refs.node.offsetHeight + 'px'
  }

  render() {
    const { children } = this.props

    if (! this.data) {
      this.data = getPageContent(this.props.location.pathname)
      this.path = this.data.path
    }

    let content = null

    if (this.data.config.template === 'list') {
      content = <List data={this.data} />
    } else {
      content = <Text data={this.data} />
    }

    return (
      <div ref="node" className={style.page}>
        <Poster file={this.data.poster} text={this.data.header} />
        <MainSection data={this.data} content={this.data.content}>
          <div ref="main">
            {content}
          </div>
          <Footer />
        </MainSection>
      </div>
    )
  }
}

export default Page
