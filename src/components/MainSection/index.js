
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdown from 'react-markdown'
import style from './style.css'

import markdown from '../../utils/markdown'

class MainSection extends Component {
  componentDidMount() {
    this._node = ReactDOM.findDOMNode(this)

    window.addEventListener('resize', ::this.handleResize)
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', ::this.handleResize)
  }

  handleResize() {
    this._node.style.paddingTop = (window.innerHeight / 6 * 5) + 'px'
  }

  render() {
    const { children, data, content } = this.props

    return (
      <section className={style.main}>
        <ReactMarkdown source={content} walker={markdown.handle} />
        {children}
      </section>
    )
  }
}

export default MainSection
