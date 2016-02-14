
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdown from 'react-markdown'

import MainSection from '../../components/MainSection'
import Poster from '../../components/Poster'

import markdown from '../../utils/markdown'
import getPageContent from '../../utils/getPageContent'
import style from './style.css'
import grid from '../../assets/css/grid.css'

class Page extends Component {
  componentDidMount() {
    window.addEventListener('resize', ::this.handleResize)
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', ::this.handleResize)
  }

  handleResize() {
    let node = ReactDOM.findDOMNode(this)
    node.parentNode.style.height = node.offsetHeight + 'px'
  }

  render() {
    const { children } = this.props
    const data = getPageContent(this.props.location.pathname)

    this.path = data.path;

    return (
      <div className={style.page}>
        <Poster file={data.poster} text={data.header} />
        <MainSection content={data.content}>
          <div className={grid.container}>
            <ReactMarkdown source={data.content} walker={markdown.handle.bind(this)} />
          </div>
          {children}
        </MainSection>
      </div>
    )
  }
}

export default Page
