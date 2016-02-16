
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

class Page extends Component {
  componentDidMount() {
    this._node = ReactDOM.findDOMNode(this)

    scrollTo(0)
    window.addEventListener('resize', (this._handleResize = ::this.handleResize))
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize)
  }

  handleResize() {
    this._node.parentNode.style.height = this._node.offsetHeight + 'px'
  }

  render() {
    const { children } = this.props
    const data = getPageContent(this.props.location.pathname)

    this.path = data.path
    setSiteTitle(data)

    return (
      <div className={style.page}>
        <Poster file={data.poster} text={data.header} />
        <MainSection content={data.content}>
          <div className={classnames(grid.container, grid.shortContainer)}>
            <ReactMarkdown className={style.text} source={data.content} walker={markdown.handle.bind(this)} />
          </div>
          {children}
        </MainSection>
        <Footer />
      </div>
    )
  }
}

export default Page
