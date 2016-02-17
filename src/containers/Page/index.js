
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdown from 'react-markdown'
import classnames from 'classnames'

import MainSection from '../../components/MainSection'
import Poster from '../../components/Poster'
import Footer from '../../components/Footer'

import markdown from '../../utils/markdown'
import getPageContent from '../../utils/getPageContent'
import style from './style.css'
import grid from '../../assets/css/grid.css'
import scrollTo from '../../utils/scrollTo'
import setSiteTitle from '../../utils/setSiteTitle'
import { rollText } from '../../utils/transformText'

class Page extends Component {
  componentDidMount() {
    setSiteTitle(this.data)

    scrollTo(0, 0.75)
    window.addEventListener('resize', (this._handleResize = ::this.handleResize))
    this.handleResize()

    let tmp = this.refs.main.querySelectorAll('a')

    for (let i = 0, _len = tmp.length; i < _len; i++) {
      tmp[i].addEventListener('mouseover', this.handleMouseOver)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize)
  }

  handleResize() {
    this.refs.node.parentNode.style.height = this.refs.node.offsetHeight + 'px'
  }

  handleMouseOver(event) {
    rollText(event.target)
  }

  render() {
    const { children } = this.props

    if (! this.data) {
      this.data = getPageContent(this.props.location.pathname)
      this.path = this.data.path
    }

    return (
      <div ref="node" className={style.page}>
        <Poster file={this.data.poster} text={this.data.header} />
        <MainSection data={this.data} content={this.data.content}>
          <div ref="main" className={classnames(grid.container, grid.shortContainer)}>
            <ReactMarkdown className={style.text} source={this.data.content} walker={markdown.handle.bind(this)} />
          </div>
          {children}
          <Footer />
        </MainSection>
      </div>
    )
  }
}

export default Page
